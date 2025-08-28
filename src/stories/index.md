---
title: Stories
layout: default.njk
---

# Stories

Real-life narratives that reveal God's grace in unexpected places — from everyday moments to life-altering events.

<ul>
  {% for item in collections.stories %}
    {% if item.url != '/stories/' %}
      <li>
        <a href="{{ item.url }}">{{ item.data.title }}</a>
        <span> — {{ item.date | readableDate }}</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
