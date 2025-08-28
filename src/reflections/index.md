---
title: Reflections
layout: default.njk
---

# Reflections

Thoughtful meditations and spiritual insights that invite you to pause, ponder, and draw closer to God.

<ul>
  {% for item in collections.reflections %}
    {% if item.url != '/reflections/' %}
      <li>
        <a href="{{ item.url }}">{{ item.data.title }}</a>
        <span> — {{ item.date | readableDate }}</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
