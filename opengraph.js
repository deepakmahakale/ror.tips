import fs from 'fs';
import sharp from 'sharp';

async function handler() {

  const mapping = {
    'sm': {
      'chars': 30,
      'lineheight': 100,
      'font-size': '70px',
    },
    'md': {
      'chars': 22,
      'lineheight': 120,
      'font-size': '90px',
    },
    'lg': {
      'chars': 18,
      'lineheight': 140,
      'font-size': '110px',
    },
    'xl': {
      'chars': 16,
      'lineheight': 170,
      'font-size': '130px',
    }
  }

  let title = process.argv[2]
  let fileName = process.argv[3]
  let chars = title.length
  let variant = 'md'

  // if (chars <= 32) {
  //   variant = 'xl'
  // } else if (chars <= 36) {
  //   variant = 'lg'
  // } else if (chars <= 60) {
  //   variant = 'md'
  // } else {
  //   variant = 'sm'
  // }

  const outputImageName = `assets/images/opengraph/${fileName}.png`;

  const backgroundImage = 'assets/images/og_template.png'
  const showIcon = true
  const showText = false
  let iconData = '';
  let iconTextPosition = '65px';
  if (showIcon) {
    iconData = fs.readFileSync('assets/images/raw_logo.svg');
    iconTextPosition = '145px';
  }
  if (!showText) {
    iconTextPosition = '-30px';
  }
  const sentence = splitSentence(title, mapping[variant]['chars'])
  console.log('len:', sentence.length)
  const title_y = 315 - ((sentence.length * mapping[variant]['lineheight']) / 2)
  // Create a canvas
  let svgImage = `
        <svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <style>
          .author {
            font: bold 25px sans-serif;
          }
          .heading {
            fill: #CC0000;
            font: 35px sans-serif;
          }
          .title {
            fill: #CC0000;
            font: bold ${mapping[variant]['font-size']} sans-serif;
          }
        </style>
        <rect x="0" y="0" width="1200" height="630" fill="#fffcf1" rx="0" ry="0" />
        <rect x="30" y="30" width="1140" height="570" fill="#fffcf1" stroke="#CC0000" strokeWidth="2" />
        ${iconData}
        <text x="50%" text-anchor="middle" y="${iconTextPosition}"  class="heading">ror.tips</text>
        <text y="${title_y}" text-anchor="middle"  dominant-baseline="middle" class="title">${sentence.join('')}</text>
        </svg>
        `;

  const svgBuffer = Buffer.from(svgImage);
  const imageBuffer = await sharp(svgBuffer)
    .png()
    .toFile(outputImageName)
    .then(() => {
      // Write the PNG buffer to a PNG file
      // fs.writeFileSync(outputImageName, pngBuffer);
      console.log('PNG file created successfully!');
    })
    .catch(err => {
      console.error('Error converting SVG to PNG:', err);
    });
}

function splitSentence(sentence, maxLength) {
  const words = sentence.split(' ');

  const result = words.reduce((acc, word) => {
    const currentLength = acc.temp.length;
    if (currentLength + word.length + 1 <= maxLength) {
      acc.temp += (currentLength > 0 ? ' ' : '') + word;
    } else {
      acc.segments.push(`<tspan x="50%" dy="1.2em">${acc.temp}</tspan>`);
      acc.temp = word;
    }
    return acc;
  }, { segments: [], temp: '' });

  // Adding the last <tspan> if there are remaining words
  if (result.temp !== '') {
    result.segments.push(`<tspan x="50%" dy="1.2em">${result.temp}</tspan>`);
  }

  return result.segments;
}

handler()
