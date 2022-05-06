const YAML = require('js-yaml');
const beautifyJson = require('json-beautify');
const converter = require('widdershins');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

let options = {
  user_templates: './templates',
  language_tabs: false,
  debug: false,
  search: true,
  version: false,
  theme: '',
};

console.log('Watching swagger-docs yaml| YML for changes...');

function generateSwaggerDoc(file) {
  const fileName = file;

  if (fileName.includes('_example')) {
    return;
  }

  const locale = fileName.match(/swagger-docs\/(en|zh-HK|zh-CN)/)?.[1];

  try {
    const slug = fileName
      .split('/')
      .pop()
      .replace(/\.(yml|yaml)/, '');

    let jsContent = YAML.load(fs.readFileSync(`./${fileName}`));
    let apiObj = JSON.parse(beautifyJson(jsContent, null, 2));

    let distPath = fileName.replace('swagger-docs', 'docs').replace(/\.(yml|yaml)/, '--autogen.md');
    distPath = path.resolve(__dirname, distPath);
    if (locale !== 'zh-CN') {
      distPath = distPath
        .replace(`${locale}/`, '')
        .replace('docs', `i18n/${locale}/docusaurus-plugin-content-docs/current`)
        .replace(/\.(yml|yaml)/, '--autogen.md');
    } else {
      // default locale should put /docs directory
      distPath = distPath.replace(`${locale}/`, '').replace(/\.(yml|yaml)/, '--autogen.md');
    }

    const distDir = path.dirname(distPath);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    const titleRe = /^title:(.+)v[\d]+\n/m;

    converter
      .convert(apiObj, options)
      .then((body) => {
        body = body.replace(/^\-\-\-\n/m, `---\nslug: ${slug}\n`);
        // 去掉 v1 的 title 后缀
        body = body.replace(titleRe, 'title:$1\n');

        console.log('Generate Markdown: ', distPath);
        fs.writeFileSync(distPath, body, 'utf8');
      })
      .catch((e) => {
        console.log('error: ', e);
      });
  } catch (e) {
    console.log('Generate file ', fileName, ' error: ', e);
  }
}

function generateAllDocs() {
  glob('./swagger-docs/**/*.yml', function(err, files) {
    files.forEach((file) => {
      generateSwaggerDoc(file);
    });
  });
}

if (process.env.WATCH === '1') {
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
    function(evt, name) {
      console.log('%s changed.', name);

      if (/\/swagger\-docs\//.test(name)) {
        return generateSwaggerDoc(name);
      }

      generateAllDocs();
    }
  );
}

generateAllDocs();
