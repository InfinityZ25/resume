const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("dateIso", (date) => {
    return DateTime.fromJSDate(date).toISO();
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
  });

eleventyConfig.addFilter("fixUrl", function(url) {
  return url.startsWith('/') ? url.substring(1) : url;
});

  return {
    dir: {
      input: "posts_md",
      output: "posts",
      includes: "../_includes",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
