---
layout: archive
---

<section id="{{ category[0] | slugify | downcase }}" class="taxonomy__section">
  <h2 class="archive__subtitle">{{ category[0] }}</h2>
  {%- for post in site.categories[page.category] -%}
    {%- unless post.hidden -%}
      <div class="entries-{{ entries_layout }}">
          {% include archive-single.html %}
      </div>
    {%- endunless -%}
  {%- endfor -%}
  <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
</section>
