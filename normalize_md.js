/**
 * Markdown file processing utility
 *
 * Features:
 * 1. Traverses Markdown files in root/docs and roots/i18n/:locale/docusaurus-plugin-content-docs/current/ directories
 * 2. Copies files to root/markdown/ directory, maintaining the original file path structure
 * 3. Removes the --autogen string from the copied Markdown files
 * 4. Parses SDKLinks elements and replaces them with documentation links for various programming languages
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// Code imported from SDKLinks.tsx
const { camelCase, snakeCase } = require('lodash')

/**
 * Generate SDK links Markdown table
 */
function generateSDKLinksMarkdown({ module = 'quote', klass, method, go, java, level = 2, title = 'SDK Links' }) {
  const snakeMethod = snakeCase(method)
  const camelMethod = camelCase(method)
  const capitalizedMethod = camelMethod.charAt(0).toUpperCase() + camelMethod.slice(1)
  const getPrefixedMethod = `get${capitalizedMethod}`

  let methodGo = go || capitalizedMethod
  let methodJava = java

  const links = [
    {
      title: 'Python',
      color: '#3572a5',
      label: `longport.openapi.${klass}.${snakeMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/python/${module}_context/#longport.openapi.${klass}.${snakeMethod}`,
    },
    {
      title: 'Rust',
      color: '#dea584',
      label: `longport::${module}::${klass}#${snakeMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/rust/longport/${module}/struct.${klass}.html#method.${snakeMethod}`,
    },
    {
      title: 'Go',
      color: '#00ADD8',
      label: `${klass}.${methodGo}`,
      url: `https://pkg.go.dev/github.com/longportapp/openapi-go/${module}#${klass}.${methodGo}`,
    },
    {
      title: 'Node.js',
      color: '#f1e05a',
      label: `${klass}#${camelMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/nodejs/classes/${klass}.html#${camelMethod}`,
    },
  ]

  if (methodJava) {
    links.push({
      title: 'Java',
      color: '#b07219',
      label: `${klass}.${getPrefixedMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/java/com/longport/${module}/${klass}.html#${methodJava}`,
    })
  }

  let markdown = ''

  // Add title
  if (title) {
    markdown += `${'#'.repeat(level)} ${title}\n\n`
  }

  // Create table
  markdown += '| SDK | 链接 |\n'
  markdown += '| --- | --- |\n'

  // Add a row for each SDK link
  links.forEach(({ title, color, label, url }) => {
    markdown += `| <span style="color: ${color}">■</span> ${title} | [${label}](${url}) |\n`
  })

  return markdown
}

/**
 * Process Markdown file
 * @param filePath file path
 * @param outputPath output path
 */
function processMarkdownFile(filePath, outputPath, locale) {
  let content = fs.readFileSync(filePath, 'utf-8')

  // Parse SDKLinks elements and replace them
  // Need to implement regex to match <SDKLinks ... /> tags and replace with Markdown tables
  content = parseSDKLinks(content, locale)

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Remove --autogen string from filename
  const fileName = path.basename(filePath)
  const newFileName = fileName.replace('--autogen', '')
  const newFilePath = path.join(outputDir, newFileName)
  // Extract slug metadata from Markdown content, if it exists and is not / or empty, use it as filename
  const slugMatch = content.match(/slug:\s*([^\n]+)/)
  let finalFileName = newFileName

  if (slugMatch && slugMatch[1]) {
    // Get slug value and clean it
    const slug = slugMatch[1].trim()
    // Only use slug as filename if it's not / or empty
    if (slug !== '/' && slug !== '') {
      // Use slug as filename, keeping original extension
      const extension = path.extname(newFileName)
      finalFileName = `${slug}${extension}`
    }
  }

  // Use the final determined filename
  const finalFilePath = path.join(outputDir, finalFileName)

  // Make sure the finalFilePath directory exists
  const finalFilePathDir = path.dirname(finalFilePath)
  if (!fs.existsSync(finalFilePathDir)) {
    fs.mkdirSync(finalFilePathDir, { recursive: true })
  }

  // Write the processed file
  fs.writeFileSync(finalFilePath, content)
}

/**
 * Main function
 */
function main() {
  cleanMarkdownDirectory()

  const rootDir = process.cwd()
  const docsDir = path.join(rootDir, 'docs')
  const i18nDir = path.join(rootDir, 'i18n')
  const outputDir = path.join(rootDir, 'autogen-markdown')

  // Process Markdown files in docs directory
  const docsFiles = glob.sync('**/*.md', { cwd: docsDir })

  docsFiles.forEach((file) => {
    const inputPath = path.join(docsDir, file)
    const outputPath = path.join(outputDir, file)
    processMarkdownFile(inputPath, outputPath, 'zh-CN')
  })

  // Process Markdown files in i18n directory
  if (fs.existsSync(i18nDir)) {
    const locales = fs.readdirSync(i18nDir)
    locales.forEach((locale) => {
      const localeDocsDir = path.join(i18nDir, locale, 'docusaurus-plugin-content-docs', 'current')
      if (fs.existsSync(localeDocsDir)) {
        const localeFiles = glob.sync('**/*.md', { cwd: localeDocsDir })
        localeFiles.forEach((file) => {
          const inputPath = path.join(localeDocsDir, file)
          const outputPath = path.join(outputDir, locale, file)
          processMarkdownFile(inputPath, outputPath, locale)
        })
      }
    })
  }
  console.log('Processing completed!')
}

/**
 * Parse SDKLinks tags and replace with corresponding Markdown tables
 * @param content Markdown file content
 * @returns Processed content
 */
function parseSDKLinks(content, locale) {
  // Match tags in format <SDKLinks module="xxx" klass="xxx" method="xxx" go="xxx" java="xxx" />
  const sdkLinksRegex =
    /<SDKLinks\s+(?:module="([^"]+)"\s+)?(?:klass="([^"]+)"\s+)?method="([^"]+)"(?:\s+go="([^"]+)")?(?:\s+java="([^"]+)")?(?:\s+level="([^"]+)")?(?:\s+title="([^"]+)")?\s*\/>/g

  return content.replace(
    sdkLinksRegex,
    (match, module = 'quote', klass = 'QuoteContext', method, go, java, level = '2', title = 'SDK 示例代码') => {
      // Process method names according to the logic in SDKLinks.tsx
      const snakeMethod = method
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
      const camelMethod = method.charAt(0).toLowerCase() + method.slice(1)
      const capitalizedMethod = camelMethod.charAt(0).toUpperCase() + camelMethod.slice(1)
      const getPrefixedMethod = `get${capitalizedMethod}`

      // Process methodGo and methodJava
      const methodGo = go || capitalizedMethod
      const methodJava = java

      // Build links for each language
      const links = [
        {
          title: 'Python',
          label: `${klass}.${snakeMethod}`,
          url: `https://longportapp.github.io/openapi-sdk/python/${module}_context/#longport.openapi.${klass}.${snakeMethod}`,
        },
        {
          title: 'JavaScript',
          label: `${klass}.${camelMethod}`,
          url: `https://longportapp.github.io/openapi-sdk/js/classes/${module}.${klass.toLowerCase()}.html#${camelMethod}`,
        },
        {
          title: 'Rust',
          label: `${klass}::${snakeMethod}`,
          url: `https://longportapp.github.io/openapi-sdk/rust/longport/${module}/struct.${klass}.html#method.${snakeMethod}`,
        },
        {
          title: 'Go',
          label: `${klass}.${methodGo}`,
          url: `https://pkg.go.dev/github.com/longportapp/openapi-go/${module}#${klass}.${methodGo}`,
        },
      ]

      // If Java method exists, add to links list
      if (methodJava) {
        links.push({
          title: 'Java',
          label: `${klass}.${methodJava}`,
          url: `https://longportapp.github.io/openapi-sdk/java/com/longport/${module}/${klass}.html#${methodJava}`,
        })
      } else {
        links.push({
          title: 'Java',
          label: `${klass}.${getPrefixedMethod}`,
          url: `https://longportapp.github.io/openapi-sdk/java/com/longport/${module}/${klass}.html#${getPrefixedMethod}`,
        })
      }

      // Generate Markdown table
      // Choose table header based on locale
      let tableHeader = ''
      if (locale === 'en') {
        tableHeader = `\n## ${title}\n\n| Language | Link |\n|---|---|`
      } else if (locale === 'zh-HK') {
        tableHeader = `\n## ${title}\n\n| 語言 | 鏈接 |\n|---|---|`
      } else {
        // Default to simplified Chinese
        tableHeader = `\n## ${title}\n\n| 语言 | 链接 |\n|---|---|`
      }

      let tableContent = tableHeader

      links.forEach((item) => {
        tableContent += `\n| ${item.title} | [${item.label}](${item.url}) |`
      })

      return tableContent
    }
  )
}

function cleanMarkdownDirectory() {
  const outputDir = path.join(process.cwd(), 'autogen-markdown')
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true })
  }
}

// call main function
main()
