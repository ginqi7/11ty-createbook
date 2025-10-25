import {
    JSDOM
} from 'jsdom'

const TO_STRIP = [
    "code",
    "pre code",
    "script",
    ".header-anchor",
];

function extractText(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Remove non-text elements
    document.querySelectorAll(TO_STRIP.join(", ")).forEach(child => child.remove());

    return document.body.textContent;
}

const cache = {};

function countChineseChars(str) {
    // 匹配中文字符（包括简体和繁体）
    const chineseRegex = /[\u4e00-\u9fa5]/g;
    const matches = str.match(chineseRegex);
    return matches ? matches.length : 0;
}

function countWords(value) {
    if (cache[value]) {
        return cache[value];
    }

    const pureText = extractText(value);
    const result = pureText
        .split(/[\s;/\\]/)
        .map(x => x.trim())
        // Word is non-empty with at least one letter or number
        .filter(x => x.match(/.*[a-z0-9].*/i))
        .length + countChineseChars(pureText);

    cache[value] = result;
    return result;
}

export default function(eleventyConfig) {
    eleventyConfig.addFilter("wordcount", countWords);
}
