---
title: Devotionals
layout: default.njk
---

## 📖 All Devotionals

<ul>
  {% for item in collections.devotionals %}
    {% if item.url != '/devotionals/' %}
      <li>
        <a href="{{ item.url }}">{{ item.data.title }}</a>
        <span> — {{ item.date | readableDate }}</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
