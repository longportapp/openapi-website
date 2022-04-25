const YAML = require('js-yaml');
const beautifyJson = require('json-beautify');
const converter = require('widdershins');
const fs = require('fs');
const glob = require('glob');

let options = {
  user_templates: './templates',
  language_tabs: false,
  debug: true,
};

console.log('Watching swagger-docs yaml| yml for changes...');

function generateSwaggerDoc(file) {
  const fileName = file;
  let jsContent = YAML.load(fs.readFileSync(`./${fileName}`));
  let apiObj = JSON.parse(beautifyJson(jsContent, null, 2));
  const distPath = fileName.replace('swagger-docs', 'docs').replace(/\.(yml|yaml)/, '.md');
  try {
    converter
      .convert(apiObj, options)
      .then((str) => {
        console.log('Generate Markdown: ', distPath);
        fs.writeFileSync(distPath, str, 'utf8');
      })
      .catch((e) => {
        console.log('error: ', e);
      });
  } catch (e) {
    console.log('Generate file ', fileName, ' error: ', e);
  }
}

// more info https://github.com/Mermade/widdershins
require('node-watch')(
  './',
  {
    recursive: true,
    filter(f, skip) {
      // skip node_modules
      if (/swagger\-docs\//.test(f)) return true;
      // skip .git folder
      if (/templates\//.test(f)) return true;
      // only watch for js files
      return false;
    },
  },
  function (evt, name) {
    console.log('%s changed.', name);

    if (/\/swagger\-docs\//.test(name)) {
      return generateSwaggerDoc(name);
    }

    glob('./swagger-docs/**/*.yml', function (err, files) {
      files.forEach((file) => {
        generateSwaggerDoc(file);
      });
    });
  }
);
