const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "MMMM d, yyyy"
    );
  });

  eleventyConfig.addFilter("extractBlock", function (content, heading) {
    const regex = new RegExp(
      `${heading}\\s*\\n([\\s\\S]*?)(?=\\n\\s*\\n|$)`,
      "i"
    );
    const match = content.match(regex);
    return match ? match[1].trim() : "";
  });

  eleventyConfig.addFilter("filterByTag", function (collection, tag) {
    const tagLc = tag.toLowerCase();
    return collection.filter((item) =>
      (item.data.tags || []).map((t) => t.toLowerCase()).includes(tagLc)
    );
  });

  eleventyConfig.addCollection("devotionals", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/devotionals/*.md");
  });

  eleventyConfig.addCollection("reflections", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/reflections/*.md")
      .filter((item) => !item.inputPath.endsWith("index.md"));
  });

  eleventyConfig.addCollection("stories", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/stories/*.md")
      .filter((item) => !item.inputPath.endsWith("index.md"));
  });

  eleventyConfig.addCollection("testimonies", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("./src/testimonies/*.md")
      .filter((item) => !item.inputPath.endsWith("index.md"));
  });

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

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets/styles");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
