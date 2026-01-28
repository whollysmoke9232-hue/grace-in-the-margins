---
layout: default.njk
---

## Devotionals

A collection of Scripture-centered writings meant to be read slowly—one at a time.  
Each devotional stands on its own, yet together they trace a single story of grace,
surrender, and trust in the God who meets us in the margins.

---

<ul class="devotional-list">
  {% for item in collections.devotionals | reverse %}
    {% if item.url != '/devotionals/' %}
      <li class="devotional-list-item">
        <a href="{{ item.url }}?from=devotionals">
          <strong>{{ item.data.title }}</strong>
        </a>

        <div class="devotional-meta">
          <span class="devotional-date">{{ item.date | readableDate }}</span>
        </div>

        {% if item.data.excerpt %}
          <p class="devotional-excerpt">
            {{ item.data.excerpt }}
          </p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
