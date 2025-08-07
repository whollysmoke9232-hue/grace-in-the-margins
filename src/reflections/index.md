---
title: Reflections
layout: default.njk
---

# Reflections

Thoughtful meditations and spiritual insights that invite you to pause, ponder, and draw closer to God.

{% for post in collections.reflections | reverse %}

## [{{ post.data.title }}]({{ post.url }})

{% if post.data.excerpt %}
{{ post.data.excerpt }}
{% endif %}
{% endfor %}
