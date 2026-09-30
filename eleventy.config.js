module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy(".htaccess");
    // eleventyConfig.addPassthroughCopy("app.js");
    eleventyConfig.addPassthroughCopy("mn_plot.json");

    // Set global permalinks to resource.html style
    eleventyConfig.addGlobalData("permalink", () => {
        return (data) =>
            `${data.page.filePathStem}.${data.page.outputFileExtension}`;
    });

    // Remove .html from `page.url`
    eleventyConfig.addUrlTransform((page) => {
        if (page.url.endsWith(".html")) {
            return page.url.slice(0, -1 * ".html".length);
        }
    });

    return {

    dir: {
      input: "src/content",
      includes: "../../_includes",
      data: "_data",
      output: "_site"
    },
    // Injects the Bluehost subfolder path prefix automatically
    // pathPrefix: "website_0059aafc" 
  };
};