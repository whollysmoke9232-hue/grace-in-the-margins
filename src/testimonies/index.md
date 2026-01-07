---
layout: default.njk
---

## Testimonies

Accounts of real transformation—marked by repentance, endurance, healing, and hope.  
They do not glorify the pain or the failure, but the faithfulness of God in the midst of it.

Each testimony stands as a witness that grace reaches farther than our worst moments,
and that redemption is still at work.

---

<ul class="testimony-list">
  {% for item in collections.testimonies | reverse %}
    {% if item.url != '/testimonies/' %}
      <li class="testimony-list-item">
        <a href="{{ item.url }}?from=testimonies">
          <strong>{{ item.data.title }}</strong>
        </a>

        <div class="testimony-meta">
          <span class="testimony-date">{{ item.date | readableDate }}</span>
        </div>

        {% if item.data.excerpt %}
          <p class="testimony-excerpt">
            {{ item.data.excerpt }}
          </p>
        {% endif %}
      </li>
    {% endif %}
  {% endfor %}
</ul>
