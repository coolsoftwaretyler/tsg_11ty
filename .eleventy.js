const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = function (eleventyConfig) {


    
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/fonts");

    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addFilter("jsmin", function (code) {
        let minified = Terser.minify(code);
        if (minified.error) {
            console.log("Terser error: ", minified.error);
            return code;
        }

        return minified.code;
    });

    return {
        dir: {
            input: "src"
        }
    };
}