---
layout: default.njk
---

## Meditations

These writings are slower and more contemplative—moments of thinking faith out loud.  
They wrestle with Scripture, experience, and tension, not to arrive at quick answers,
but to remain attentive to God’s presence in the questions.

Reflections are not meant to resolve everything.  
They are meant to help us notice where God is already at work.

---

<ul class="reflection-list">
  {% for item in collections.meditations | reverse %}
    {% if item.url != '/meditations/' %}
      <li class="reflection-list-item">
        <a href="{{ item.url }}?from=meditations">
          <strong>{{ item.data.title }}</strong>
        </a>

        <div class="reflection-meta">
          <span class="reflection-date">{{ item.date | readableDate }}</span>
        </div>

        {% if item.data.excerpt %}
          <p class="reflection-excerpt">
            {{ item.data.excerpt }}
          </p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
