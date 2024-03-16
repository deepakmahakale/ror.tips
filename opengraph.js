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
      'offset': 570,
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

  if (chars <= 32) {
    variant = 'xl'
  } else if (chars <= 36) {
    variant = 'lg'
  } else if (chars <= 60) {
    variant = 'md'
  } else {
    variant = 'sm'
  }

  const outputImageName = `assets/images/opengraph/${fileName}.png`;

  const backgroundImage = 'assets/images/og_template.png'

  const sentence = splitSentence(title, mapping[variant]['chars'])
  console.log('len:', sentence.length)
  const title_y = 570 - (sentence.length * mapping[variant]['lineheight'])
  // Create a canvas
  let svgImage = `
        <svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <style>
          .author {
            font: bold 25px sans-serif;
          }
          .title {
            fill: #CC0000;
            font: bold ${mapping[variant]['font-size']} sans-serif;
          }
        </style>
        <text text-anchor="middle" y="${title_y}" class="title">${sentence.join('')}</text>
        </svg>
        `;

  // Buffer.from(`<svg><text x="50%" y="50%" fill="${fontColor}" font-family="${fontFamily}" font-size="${fontSize}" text-anchor="middle">${text}</text></svg>`),
  // gravity

  const svgBuffer = Buffer.from(svgImage);
  const imageBuffer = await sharp(backgroundImage)
    .composite([{ input: svgBuffer }])
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
