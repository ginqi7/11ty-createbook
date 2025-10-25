import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pluginWordcount from "./plugins/wordcount.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sameBookPages(pages, page) {
    const title = page.data.titlea || bookTitle(page.filePathStem);
    // console.log(title);
    return pages.filter(
        (item) => title == (item.data.title || bookTitle(item.filePathStem)),
    );
}

function sortPages(pages) {
    return pages.sort((a, b) => {
      // Extract file names for comparison
      const nameA = a.inputPath.toLowerCase();
      const nameB = b.inputPath.toLowerCase();
      // Sort by file name alphabetically
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
}


function parentPath(path) {
    const pathSegments = path.split("/").filter(Boolean);
    pathSegments.pop(); // Remove the last segment
    return "/" + pathSegments.join("/") + "/";
}

function bookTitle(path) {
    const pathSegments = path.split("/").filter(Boolean);
    pathSegments.pop(); // Remove the last segment
    return pathSegments.at(-1);
}

function language(data) {
    const chineseRegex = /[\u4e00-\u9fa5]/g;
    const matches = data.match(chineseRegex);
    return matches ? "zh" : "en";
}

function limitN(data, n) {
    return data.slice(0, n);
}

export default function (eleventyConfig) {
    // copy static files to output directory.
    eleventyConfig.addPassthroughCopy("assets/*");
    eleventyConfig.addPassthroughCopy("assets/**/*");
    eleventyConfig.addPassthroughCopy("books/**/*.png");
    eleventyConfig.addPassthroughCopy("books/**/*.jpg");
    eleventyConfig.addPassthroughCopy("books/**/*.svg");

    eleventyConfig.addPlugin(pluginWordcount);
    eleventyConfig.addFilter("sameBookPages", sameBookPages);
    eleventyConfig.addFilter("sortPages", sortPages);
    eleventyConfig.addFilter("parentPath", parentPath);
    eleventyConfig.addFilter("bookTitle", bookTitle);
    eleventyConfig.addFilter("language", language);
    eleventyConfig.addFilter("limitN", limitN);

    eleventyConfig.addGlobalData("layout", "page");
    eleventyConfig.addCollection("pages", function (collectionApi) {
        const pages = collectionApi.getFilteredByGlob(`books/**/*`);
        return pages;
    });

    // add some book collections
    eleventyConfig.addCollection("books", function (collectionApi) {
        const directoryPath = path.join(__dirname, "books");
        return getAllBookInfos(collectionApi, directoryPath);
    });
}

function getAllBookInfos(collectionApi, dirPath) {
    const files = fs.readdirSync(dirPath);
    const bookInfos = [];
    for (const title of files) {
        const bookDir = path.join(dirPath, title);
        if (!fs.statSync(bookDir).isDirectory()) {
            continue;
        }
        var bookInfo = {
            title: title,
        };
        // Book Cover
        const bookCover = path.join(bookDir, `cover.png`);
        if (fs.existsSync(bookCover)) {
            bookInfo.cover = `/books/${title}/cover.png`;
        }

        // Book Meta Data.
        const bookJson = path.join(bookDir, `${title}.json`);
        if (fs.existsSync(bookJson)) {
            const fileContent = fs.readFileSync(bookJson, "utf8");
            const json = JSON.parse(fileContent);
            if (json.cover) {
                json.cover = `/books/${title}/${json.cover}`;
            }
            bookInfo = {
                ...bookInfo,
                ...json,
            };
        }
        bookInfo.pages = collectionApi.getFilteredByGlob(`books/${title}/*`);
        // for (const page of bookInfo.pages) {
        //     console.log(page);
        // }
        bookInfos.push(bookInfo);
    }
    // console.log(bookInfos);
    return bookInfos;
}
