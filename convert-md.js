"use strict";
const YAML = require("js-yaml");
const beautifyJson = require("json-beautify");
const converter = require("widdershins");
const fs = require("fs");

let options = {
  user_templates: "./templates",
  language_tabs: false,
  debug: true
};
// options.templateCallback = myCallBackFunction;

// function myCallBackFunction(templateName, stage, data) {
//   let statusString = "Template name: " + templateName + "\n";
//   statusString += "Stage: " + stage + "\n";
//   data.append = statusString;
//   return data;
// }

require("node-watch")("./swagger-docs/", { recursive: true }, function(
  evt,
  name
) {
  console.log("%s changed.", name);
  let jsContent = YAML.load(fs.readFileSync(`./${name}`));
  let apiObj = JSON.parse(beautifyJson(jsContent, null, 2));
  const distPath = name
    .replace("swagger-docs", "docs")
    .replace(/\.(yml|yaml)/, ".md");
  converter.convert(apiObj, options).then(str => {
    console.log("generate md file: ", distPath);
    fs.writeFileSync(distPath, str, "utf8");
  });
});
