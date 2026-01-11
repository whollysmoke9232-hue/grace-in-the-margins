---
layout: default.njk
---

## Stories

Narratives drawn from real life—moments where God’s grace becomes visible in
unexpected ways, from ordinary days to life-altering events.

These stories are not polished parables.  
They are lived moments where God quietly breaks in, redeems, restores,
and reminds us that He is always at work.

---

<ul class="story-list">
  {% for item in collections.stories | reverse %}
    {% if item.url != '/stories/' %}
      <li class="story-list-item">
        <a href="{{ item.url }}?from=stories">
          <strong>{{ item.data.title }}</strong>
        </a>

        <div class="story-meta">
          <span class="story-date">{{ item.date | readableDate }}</span>
        </div>

        {% if item.data.excerpt %}
          <p class="story-excerpt">
            {{ item.data.excerpt }}
          </p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
