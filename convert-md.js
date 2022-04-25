const YAML = require("js-yaml");
const beautifyJson = require("json-beautify");
const converter = require("widdershins");
const fs = require("fs");

let options = {
  user_templates: "./templates",
  language_tabs: false,
  debug: true
};

console.log("Watching swagger-docs yaml| yml for changes...");

// more info https://github.com/Mermade/widdershins
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
