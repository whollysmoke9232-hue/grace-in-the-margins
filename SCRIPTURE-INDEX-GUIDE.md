# Scripture Index - Usage Guide

## Overview
The Scripture Index feature allows you to tag posts with scripture references and automatically generates an organized index page that lists all scriptures cited across your site.

## How to Add Scripture References to Your Posts

In the front matter of any post (devotional, meditation, reflection, story, or testimony), add a `scripture` field with an array of scripture references:

```yaml
---
title: "Your Post Title"
date: 2024-01-15
scripture:
  - "Psalm 46:7-11"
  - "Romans 8:28"
  - "1 John 4:19"
tags:
  - Grace
  - Hope
---
```

## Scripture Reference Format

Use this format for consistency:
- **Book name**: Full name (e.g., "Psalm", "Romans", "1 Corinthians")
- **Chapter and verse**: Use colons and hyphens (e.g., "3:16", "5:1-8")
- **Multiple verses**: Use hyphens for ranges (e.g., "12:1-5")
- **Single chapters**: Include chapter number (e.g., "Psalm 23")

### Examples:
- ✅ `"Psalm 46:7-11"`
- ✅ `"Acts 13:22"`
- ✅ `"2 Samuel 11"`
- ✅ `"1 Corinthians 13:1-13"`

## Viewing the Scripture Index

- **Main Index**: Visit `/scripture/` to see all scriptures organized by biblical book
- **Individual Scripture Pages**: Click any scripture reference to see all posts that reference it

## Navigation

The Scripture Index link has been added to:
- Homepage (bottom navigation section)
- Listed alongside "Browse by Tag" and "Why This Place Exists"

## Technical Details

The scripture system includes:
1. **scriptureList collection**: Gathers all unique scripture references
2. **Scripture index page** (`/src/scripture.njk`): Main listing organized by book
3. **Individual scripture pages** (`/src/scripture/scripture-page.njk`): Shows all posts for each reference
4. **Automatic URL generation**: Each scripture gets a clean URL (e.g., `/scripture/psalm-46-7-11/`)

## Example Posts with Scripture References

Three example posts have been updated with scripture metadata:
- [Be Still](../src/devotionals/be-still.md)
- [After God's Heart](../src/testimonies/after-gods-heart.md)
- [A Meditation in Suffering](../src/meditations/a-meditation-in-suffering.md)

You can reference these files to see the proper format for adding scripture references to your content.
