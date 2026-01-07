---
layout: default.njk
---

## Reflections

Thoughtful meditations and spiritual insights that invite you to pause, ponder,
and attend to God’s presence—especially in the quiet places where faith deepens.

These writings are not meant to resolve every question.  
They are meant to help us notice where God is already at work.

---

<ul class="reflection-list">
  {% for item in collections.reflections | reverse %}
    {% if item.url != '/reflections/' %}
      <li class="reflection-list-item">
        <a href="{{ item.url }}?from=reflections">
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
