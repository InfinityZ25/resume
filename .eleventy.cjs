const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("dateIso", (date) => {
    return DateTime.fromJSDate(date).toISO();
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
  });

  // Add this line to create a collection of all posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts_md/*.md");
  });

  return {
    dir: {
      input: "posts_md",
      output: "posts",
      includes: "../_includes",
    },
    templateFormats: ["md"],
    markdownTemplateEngine: "njk",
  };
};
