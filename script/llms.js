const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { capitalize } = require('lodash')
// List of file paths to ignore
const ignoredFiles = ['changelog.md']

/**
 * Extract title, slug and description from Markdown file
 * @param {string} filePath - Markdown file path
 * @param {string} rootDir - Root directory path
 * @returns {Object} Object containing title, slug and description
 */
function extractMarkdownInfo(filePath, rootDir) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    // Extract title
    const title = data.title || path.basename(filePath, path.extname(filePath))
    // Extract slug and ensure correct format (starts with / and ends with .md)
    let slug
    if (data.slug) {
      // If data.slug exists
      if (data.slug.startsWith('/')) {
        // If data.slug already starts with /, use it directly
        slug = data.slug
      } else {
        // Otherwise, combine it with the relative file path
        const dirPath = path.dirname(path.relative(rootDir, filePath))
        slug = dirPath !== '.' ? `/${dirPath}/${data.slug}` : `/${data.slug}`
      }
    } else {
      // If data.slug doesn't exist, use the relative file path
      slug = `/${path.relative(rootDir, filePath).replace(path.extname(filePath), '')}`
    }

    // If slug equals "/", replace with "/index"
    if (slug === '/') slug = '/index'

    // Ensure slug starts with /en/
    if (!slug.startsWith('/en/')) {
      slug = `/en${slug}`
    }

    // Add docs segment to the path
    if (!slug.includes('/docs/')) {
      const parts = slug.split('/')
      const enIndex = parts.findIndex((part) => part === 'en')
      if (enIndex !== -1) {
        parts.splice(enIndex + 1, 0, 'docs')
        slug = parts.join('/')
      }
    }

    // Ensure slug ends with .md
    if (!slug.endsWith('.md')) {
      slug = `${slug}.md`
    }

    // Remove duplicate slashes in slug
    slug = slug.replace(/\/+/g, '/')

    // Extract description
    let description = ''
    // Try to find content after the first heading as description
    const headingMatch = content.match(/^#\s+(.+)$/m)
    if (headingMatch) {
      const headingIndex = content.indexOf(headingMatch[0])
      const afterHeading = content.substring(headingIndex + headingMatch[0].length).trim()
      const nextParagraph = afterHeading.split('\n\n')[0].trim()
      description = nextParagraph
    } else {
      // If no heading found, use the first few sentences of content
      description = content.split('\n\n')[0].trim()
    }

    // If description is too long, truncate it
    if (description.length > 200) {
      description = description.substring(0, 147) + '...'
    }

    return { title, slug, description }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
    return { title: path.basename(filePath), slug: path.relative(rootDir, filePath), description: '' }
  }
}

function shouldIgnoreFile(filePath) {
  return ignoredFiles.some((ignoredFile) => filePath.endsWith(ignoredFile))
}

/**
 * Recursively traverse directory and generate Markdown link list
 * @param {string} dir - Directory to traverse
 * @param {string} rootDir - Root directory path
 * @returns {Object} Object containing directory structure and links
 */
function traverseDirectory(dir, rootDir) {
  const result = {
    sections: {},
    links: [],
  }

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const relativePath = path.relative(rootDir, fullPath)
    const stat = fs.statSync(fullPath)

    if (shouldIgnoreFile(relativePath)) {
      // Skip ignored files
      continue
    }

    if (stat.isDirectory()) {
      // Process subdirectory
      const dirName = capitalize(path.basename(fullPath))

      result.sections[dirName] = traverseDirectory(fullPath, rootDir)
    } else if (stat.isFile() && path.extname(file) === '.md') {
      // Process Markdown file
      const { title, slug, description } = extractMarkdownInfo(fullPath, rootDir)
      result.links.push({ title, slug, description })
    }
  }

  return result
}

/**
 * Generate Markdown link list
 * @param {Object} structure - Directory structure and links
 * @returns {string} Formatted Markdown link list
 */
function generateMarkdownList(structure) {
  let output = ''

  // Add links for current directory
  for (const link of structure.links) {
    output += `- [${link.title}](https://open.longportapp.com${link.slug})\n`
  }

  // Add links for subdirectories
  for (const [section, content] of Object.entries(structure.sections)) {
    if (content.links.length === 0) {
      continue
    }

    output += `\n## ${section}\n\n`
    output += generateMarkdownList(content)
  }

  return output
}

function extractIntroContent(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(fileContent)
  // Remove MDX code and special markers
  let normalizedContent = content
    // Remove import statements
    .replace(/import\s+.*?from\s+['"].*?['"]\s*;?/g, '')
    // Remove empty lines
    .replace(/\n\s*\n+/g, '\n\n')
    // Trim whitespace at beginning and end
    .trim()
  return normalizedContent
}

/**
 * Generate full content file with all markdown files
 */
function generateLLMSFullTxt() {
  const rootDir = path.join(process.cwd(), 'autogen-markdown')
  const enDir = path.join(rootDir, 'en')

  try {
    if (!fs.existsSync(enDir)) {
      console.error(`Directory does not exist: ${enDir}`)
      return
    }

    let fullContent = '# LongPort OpenAPI Documentation'

    // Function to recursively process all markdown files
    function processDirectory(dir, indent = '') {
      const files = fs.readdirSync(dir)

      // Process files first, then directories for better organization
      // First pass: process markdown files
      for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (shouldIgnoreFile(fullPath)) {
          // Skip ignored files
          continue
        }

        if (stat.isFile() && path.extname(file) === '.md') {
          const fileContent = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContent)

          // Add file title as heading
          const fileName = path.basename(file, '.md')
          const title = data.title || capitalize(fileName)

          fullContent += `\n\n${indent}# ${title}\n\n`
          fullContent += content.trim()
        }
      }

      // Second pass: process directories
      for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          const dirName = capitalize(path.basename(fullPath))
          fullContent += `\n\n${indent}## ${dirName}\n`
          processDirectory(fullPath, indent + '#')
        }
      }
    }

    // Start processing from the en directory
    processDirectory(enDir)

    // Write to llms-full.txt
    fs.writeFileSync('llms-full.txt', fullContent)
    console.log('--> Generated llms-full.txt with all markdown content')
  } catch (error) {
    console.error('Error generating full content file:', error)
  }
}

function generateLLMSTxt() {
  const rootDir = path.join(process.cwd(), 'autogen-markdown')
  // Only support en locale
  const enDir = path.join(rootDir, 'en')

  try {
    if (!fs.existsSync(enDir)) {
      console.error(`Directory does not exist: ${enDir}`)
      return
    }

    let content = ''
    const structure = traverseDirectory(enDir, rootDir)
    const markdownList = generateMarkdownList(structure)

    // Extract content from index.md
    let introContent = extractIntroContent(path.join(enDir, 'index.md'))

    content = `# LongPort OpenAPI Documentation\n\n${introContent}\n\n## SDK \n\n${markdownList}`

    // write to llms.txt
    fs.writeFileSync('llms.txt', content)
    console.log('--> Generated llms.txt with fast markdown content')
  } catch (error) {
    console.error('Error processing directory:', error)
  }
}

/**
 * Main function
 */
function main() {
  generateLLMSTxt()
  generateLLMSFullTxt()
}

main()
