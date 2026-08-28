const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    const projectConfigPath = path.join(__dirname, "src", "projects", "projects.json");
    let projectOrder = [];

    try {
        const config = JSON.parse(fs.readFileSync(projectConfigPath, "utf8"));
        if (Array.isArray(config.projectOrder)) {
            projectOrder = config.projectOrder;
        }
    } catch (error) {
        console.warn("Could not load project order from src/projects/projects.json:", error.message);
    }

    const projectOrderMap = new Map(projectOrder.map((fileName, index) => [fileName, index]));

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
    eleventyConfig.addPassthroughCopy("src/projects/images/**/*.png");
    eleventyConfig.addPassthroughCopy("src/projects/images/**/*.webp");
    eleventyConfig.addPassthroughCopy("src/projects/images/**/*.jpg");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/avif");
    eleventyConfig.addPassthroughCopy("src/thumbs_avif");
    eleventyConfig.addPassthroughCopy("src/*.html");

    eleventyConfig.addCollection("projects", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/projects/content/*.md").sort((a, b) => {
            const aFileName = path.basename(a.inputPath);
            const bFileName = path.basename(b.inputPath);

            const aOrder = projectOrderMap.has(aFileName)
                ? projectOrderMap.get(aFileName)
                : Number.MAX_SAFE_INTEGER;
            const bOrder = projectOrderMap.has(bFileName)
                ? projectOrderMap.get(bFileName)
                : Number.MAX_SAFE_INTEGER;

            if (aOrder !== bOrder) {
                return aOrder - bOrder;
            }

            return aFileName.localeCompare(bFileName);
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
