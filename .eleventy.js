const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // 📅 Date formatting filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "MMMM d, yyyy"
    );
  });

  // 🧠 extractBlock filter
  eleventyConfig.addFilter("extractBlock", function (content, heading) {
    const regex = new RegExp(
      `${heading}\\s*\\n([\\s\\S]*?)(?=\\n\\s*\\n|$)`,
      "i"
    );
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  });

  // 🏷️ filterByTag filter
  eleventyConfig.addFilter("filterByTag", function (collection, tag) {
    return collection.filter(
      (item) => item.data.tags && item.data.tags.includes(tag)
    );
  });

  // 📚 Devotionals collection (sorted newest first)
  eleventyConfig.addCollection("devotionals", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/devotionals/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // 📚 Reflections collection (sorted newest first)
  eleventyConfig.addCollection("reflections", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/reflections/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // 📚 Stories collection (sorted newest first)
  eleventyConfig.addCollection("stories", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/stories/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // 📚 Testimonies collection (sorted newest first)
  eleventyConfig.addCollection("testimonies", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/testimonies/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // 🏷️ Tag list collection
  eleventyConfig.addCollection("tagList", function (collection) {
    const tagSet = new Set();
    collection.getAll().forEach((item) => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        tags = tags.filter((tag) => tag !== "devotionals");
        tags.forEach((tag) => tagSet.add(tag.trim().toLowerCase()));
      }
    });
    return [...tagSet];
  });

  // ✅ Passthrough copy for CSS, assets, and images
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("images");

  // 📁 Directory structure
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
