import fs from 'fs-extra'
import path from 'path'
import { globSync } from 'glob'
import { rewriteMarkdownPath } from '../docs/.vitepress/utils'

type Locale = 'en' | 'zh-CN' | 'zh-HK'

/**
 * Process Markdown file
 * @param filePath file path
 * @param outputPath output path
 * @param locale locale for the file
 */
function processMarkdownFile(filePath: string, outputPath: string, locale: Locale, docsDir: string): void {
  let content = fs.readFileSync(filePath, 'utf-8')

  // Parse SDKLinks elements and replace them
  // Need to implement regex to match <SDKLinks ... /> tags and replace with Markdown tables
  content = parseSDKLinks(content, locale)

  const relativePath = path.relative(docsDir, filePath)

  const rewritePath = rewriteMarkdownPath(relativePath)
  // console.log(`rewritePath: ${relativePath} -> ${rewritePath}`)

  // Use the final determined filename
  const finalFilePath = path.join(outputPath, rewritePath)

  fs.ensureDirSync(path.dirname(finalFilePath))

  fs.writeFileSync(finalFilePath, content, { encoding: 'utf-8' })
}

/**
 * Main function
 */
function main(): void {
  const rootDir = process.cwd()
  const docsDir = path.join(rootDir, 'docs')
  const outputDir = path.join(rootDir, 'docs/.vitepress/dist')

  // Process Markdown files in docs directory

  // Process Markdown files in i18n directory
  const locales = fs.readdirSync(docsDir)
  locales.forEach((locale: string) => {
    if (!['en', 'zh-CN', 'zh-HK'].includes(locale)) {
      return
    }
    const localeDocsDir = path.join(docsDir, locale)
    if (fs.existsSync(localeDocsDir)) {
      const localeFiles = globSync('**/*.md', { cwd: localeDocsDir })
      localeFiles.forEach((file: string) => {
        const inputPath = path.join(localeDocsDir, file)
        processMarkdownFile(inputPath, outputDir, locale as Locale, docsDir)
      })
    }
  })
  console.log('Processing completed!')
}

/**
 * Parse SDKLinks tags and replace with corresponding Markdown tables
 * @param content Markdown file content
 * @param locale locale for table headers
 * @returns Processed content
 */
function parseSDKLinks(content: string, locale: Locale): string {
  // Match tags in format <SDKLinks module="xxx" klass="xxx" method="xxx" go="xxx" java="xxx" />
  const sdkLinksRegex =
    /<SDKLinks\s+(?:module="([^"]+)"\s+)?(?:klass="([^"]+)"\s+)?method="([^"]+)"(?:\s+go="([^"]+)")?(?:\s+java="([^"]+)")?(?:\s+level="([^"]+)")?(?:\s+title="([^"]+)")?\s*\/>/g

  // snakeCase: e.g. "GetHistory" -> "get_history"
  const snakeCase = (str: string): string => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  }
  // camelCase: e.g. "get_history" -> "getHistory"
  const camelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
  }

  return content.replace(
    sdkLinksRegex,
    (module = 'quote', klass = 'QuoteContext', method: string, go?: string, java?: string, title = 'SDK'): string => {
      // 统一方法名处理逻辑
      const snakeMethod = snakeCase(method)
      const camelMethod = camelCase(method)
      const capitalizedMethod = camelMethod.charAt(0).toUpperCase() + camelMethod.slice(1)
      const getPrefixedMethod = `get${capitalizedMethod}`
      const methodGo = go || capitalizedMethod
      const methodJava = java

      // 生成链接，顺序与 Vue 组件一致
      const links: { title: string; label: string; url: string }[] = [
        {
          title: 'Python',
          label: `longport.openapi.${klass}.${snakeMethod}`,
          url: `https://longportapp.github.io/openapi/python/reference_all/#longport.openapi.${klass}.${snakeMethod}`,
        },
        {
          title: 'Rust',
          label: `longport::${module}::${klass}#${snakeMethod}`,
          url: `https://longportapp.github.io/openapi/rust/longport/${module}/struct.${klass}.html#method.${snakeMethod}`,
        },
        {
          title: 'Go',
          label: `${klass}.${methodGo}`,
          url: `https://pkg.go.dev/github.com/longportapp/openapi-go/${module}#${klass}.${methodGo}`,
        },
        {
          title: 'Node.js',
          label: `${klass}#${camelMethod}`,
          url: `https://longportapp.github.io/openapi/nodejs/classes/${klass}.html#${camelMethod.toLowerCase()}`,
        },
      ]

      // Java 仅在有 java 参数时添加，label 为 ${klass}.${getPrefixedMethod}，url 结尾为 #${methodJava}
      if (methodJava) {
        links.push({
          title: 'Java',
          label: `${klass}.${getPrefixedMethod}`,
          url: `https://longportapp.github.io/openapi/java/com/longport/${module}/${klass}.html#${methodJava}`,
        })
      }

      // Generate Markdown table
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
// call main function
main()
