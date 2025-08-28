---
title: Stories
layout: default.njk
---

# Stories

Real-life narratives that reveal God’s grace in unexpected places — from everyday moments to life-altering events.

{% for post in collections.stories | reverse %}

## [{{ post.data.title }}]({{ post.url }})

{% if post.data.excerpt %}
{{ post.data.excerpt }}
{% endif %}
{% endfor %}
