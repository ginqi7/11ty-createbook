import fs from "fs";
import util from "util";
import nodePandoc from "node-pandoc";

const pandocAsync = util.promisify(nodePandoc);

function addOrgFormat(eleventyConfig) {
  eleventyConfig.addTemplateFormats("org");
  eleventyConfig.addExtension("org", {
    compile: async (inputContent, inputPath) => {
      const output = await pandocAsync(inputContent, "-f org -t html");
      return async () => {
        return output;
      };
    },
    getData: true,
    getInstanceFromInputPath: async (inputPath) => {
      let data = {};
      fs.readFileSync(inputPath, "utf-8")
        .split(/\r?\n/)
        .forEach((line) => {
          let match = /^#\+(.*): ?(.*)/.exec(line);
          if (match) {
            let key = match[1].toLowerCase(),
              val = match[2].trim();
            if (key == "date") {
              data["date"] = val.split(" ")[0].replace(/<|>/g, "");
            } else {
              data[key] = val;
            }
          }
        });
      return { data: data };
    },
  });
}

export default function (eleventyConfig) {
  addOrgFormat(eleventyConfig);
}
