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

  // 📚 Devotionals collection
  eleventyConfig.addCollection("devotionals", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/devotionals/*.md");
  });

  // 📚 Reflections collection
  eleventyConfig.addCollection("reflections", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/reflections/*.md");
  });
  // 📚 About collection
  eleventyConfig.addCollection("about", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/about/*.md");
  });

  // 📚 Stories collection
  eleventyConfig.addCollection("stories", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/stories/*.md");
  });

  // 📚 Testimonies collection
  eleventyConfig.addCollection("testimonies", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/testimonies/*.md");
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
  eleventyConfig.addPassthroughCopy("assets/styles");
  eleventyConfig.addPassthroughCopy("assets/scripts");

  // 📁 Directory structure
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
