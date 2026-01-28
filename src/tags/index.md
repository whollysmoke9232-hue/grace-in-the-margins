---
title: "Browse by Tag"
layout: layout.njk
---

Explore writings by theme and topic. Each tag gathers related reflections, devotionals, meditations, stories, and testimonies.

---

### All Tags

<div class="tag-cloud">
{% for tag in collections.tagList %}
  <a href="/tags/{{ tag | slug }}/" class="tag-link">{{ tag }}</a>
{% endfor %}
</div>

<style>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;
}

.tag-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  transition: background 0.2s;
}

.tag-link:hover {
  background: #e0e0e0;
}
</style>

---

<nav class="explore-bubbles" aria-label="Return to Home">
  <a href="/">← Return to Home</a>
</nav>
