const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {

  // 🔗 Configure markdown to add anchor IDs to headings
  const markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: false,
    level: [1, 2, 3, 4],
    slugify: (s) => s.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
  });
  
  eleventyConfig.setLibrary("md", markdownLibrary);

  // 📅 Date formatting filter (robust: works with Date, ISO string, or undefined)
  eleventyConfig.addFilter("readableDate", (dateValue) => {
    if (!dateValue) return "";
    // Eleventy usually gives a JS Date, but handle ISO strings too
    if (dateValue instanceof Date) {
      return DateTime.fromJSDate(dateValue, { zone: "utc" }).toFormat("MMMM d, yyyy");
    }
    // try ISO
    const dt = DateTime.fromISO(String(dateValue), { zone: "utc" });
    return dt.isValid ? dt.toFormat("MMMM d, yyyy") : String(dateValue);
  });

  // 🔗 Slug filter
  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return "";
    return String(str).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  });

  // 🧠 extractBlock filter
  eleventyConfig.addFilter("extractBlock", function (content, heading) {
    if (!content || !heading) return "";
    const regex = new RegExp(`${heading}\\s*\\n([\\s\\S]*?)(?=\\n\\s*\\n|$)`, "i");
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  });

  // 🏷️ filterByTag filter
  eleventyConfig.addFilter("filterByTag", function (collection, tag) {
    return (collection || []).filter(
      (item) => item.data && item.data.tags && item.data.tags.includes(tag)
    );
  });

  // 📚 Collections (keep what you had; add others only if you need them later)
  eleventyConfig.addCollection("devotionals", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/devotionals/*.md");
  });

  eleventyConfig.addCollection("reflections", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/reflections/*.md");
  });

  eleventyConfig.addCollection("meditations", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/meditations/*.md");
  });

  eleventyConfig.addCollection("stories", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/stories/*.md");
  });

  eleventyConfig.addCollection("testimonies", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/testimonies/*.md");
  });

  // 🏷️ Tag list collection
  eleventyConfig.addCollection("tagList", function (collection) {
    const tagSet = new Set();
    (collection.getAll() || []).forEach((item) => {
      if (item.data && Array.isArray(item.data.tags)) {
        item.data.tags
          .filter((tag) => tag && tag !== "devotionals")
          .forEach((tag) => {
            const slugified = String(tag).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            tagSet.add(slugified);
          });
      }
    });
    return [...tagSet];
  });

  // ✅ Passthrough copy (match YOUR structure)
  // - src/assets -> _site/assets
  // - project-root images -> _site/images
  // - project-root assets/css -> _site/assets/css   (this is the big missing piece for many “unstyled” previews)
 eleventyConfig.addPassthroughCopy({ "assets/css": "assets/css" });
eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
eleventyConfig.addPassthroughCopy({ "images": "images" });


  // 📁 Directory structure
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "docs",
    },
  };
};
