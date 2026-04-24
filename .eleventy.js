const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    const md = new markdownIt({
        html: true,
        breaks: true,
        linkify: true
    });

    eleventyConfig.addFilter("markdown", (content) => {
        if (!content) return "";
        return md.renderInline(content);
    });

    // Copy static assets
    eleventyConfig.addPassthroughCopy("src/index.css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/Montserrat");
    eleventyConfig.addPassthroughCopy("src/projects/**/*.png");
    eleventyConfig.addPassthroughCopy("src/projects/**/*.webp");
    eleventyConfig.addPassthroughCopy("src/projects/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/avif");
    eleventyConfig.addPassthroughCopy("src/thumbs_avif");
    eleventyConfig.addPassthroughCopy("src/*.html");

    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/projects/*.md").sort((a, b) => {
            return a.data.order - b.data.order;
        });
    });

    return {
        templateFormats: ["njk", "md"],
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
