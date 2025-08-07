---
title: Testimonies
layout: default.njk
---

# All Testimonies

Powerful accounts of transformation, healing, and hope that testify to God’s presence and faithfulness.

{% for post in collections.testimonies | reverse %}

## [{{ post.data.title }}]({{ post.url }})

{% if post.data.author %}_by {{ post.data.author }}_{% endif %}
{% if post.data.excerpt %}
{{ post.data.excerpt }}
{% endif %}
{% endfor %}
