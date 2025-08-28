---
title: Testimonies
layout: default.njk
---

# All Testimonies

Powerful accounts of transformation, healing, and hope that testify to God's presence and faithfulness.

<ul>
  {% for item in collections.testimonies %}
    {% if item.url != '/testimonies/' %}
      <li>
        <a href="{{ item.url }}">{{ item.data.title }}</a>
        <span> — {{ item.date | readableDate }}</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
