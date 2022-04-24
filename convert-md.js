"use strict";
const YAML = require("js-yaml");
const beautifyJson = require("json-beautify");
const converter = require("widdershins");
const fs = require("fs");

let options = { user_templates: "./templates" };
// options.templateCallback = myCallBackFunction;

// function myCallBackFunction(templateName, stage, data) {
//   let statusString = "Template name: " + templateName + "\n";
//   statusString += "Stage: " + stage + "\n";
//   data.append = statusString;
//   return data;
// }

// JSON or YAML String -> JS object
let jsContent = YAML.load(fs.readFileSync("./oas/trade/orders.yaml"));
// JS Object -> pretty JSON string
let apiObj = JSON.parse(beautifyJson(jsContent, null, 2));

converter.convert(apiObj, options).then(str => {
  fs.writeFileSync("./docs/test.md", str, "utf8");
});
