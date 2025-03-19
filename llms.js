const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { capitalize } = require('lodash')

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
    let slug = data.slug || path.relative(rootDir, filePath).replace(path.extname(filePath), '')
    if (!slug.startsWith('/')) slug = `/${slug}`
    // If slug equals "/", replace with "index"
    if (slug === '/') slug = '/index'
    slug = `/en/docs${slug}.md`

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

  // List of file paths to ignore
  const ignoredFiles = ['changelog.md']

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const relativePath = path.relative(rootDir, fullPath)
    const stat = fs.statSync(fullPath)

    // Check if file is in ignore list
    const shouldIgnore = ignoredFiles.some((ignoredFile) => relativePath.endsWith(ignoredFile))

    if (shouldIgnore) {
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
    output += `- [${link.title}](${link.slug})\n`
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

/**
 * Convert HTML table element to Markdown table format
 * @param {HTMLTableElement} tableElement - HTML table element
 * @returns {string} Markdown table format string
 */
function convertTableToMarkdown(tableElement) {
  if (!tableElement || tableElement.tagName !== 'TABLE') {
    return 'Invalid table element'
  }

  const rows = tableElement.rows
  let markdown = ''
  let headerProcessed = false

  // Process each row in the table
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const cells = row.cells
    let rowContent = '|'

    // Process each cell in the row
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j]
      let cellContent = ` ${cell.textContent.trim()} |`

      // Handle rowspan attribute
      if (cell.hasAttribute('rowspan')) {
        // In Markdown, rowspan cannot be directly handled, need to repeat content in subsequent rows
        const rowspan = parseInt(cell.getAttribute('rowspan'))
        if (rowspan > 1) {
          cellContent = ` ${cell.textContent.trim()} |`
        }
      }

      rowContent += cellContent
    }

    markdown += rowContent + '\n'

    // Add separator row after header
    if (!headerProcessed && i === 0) {
      let separatorRow = '|'
      for (let j = 0; j < cells.length; j++) {
        separatorRow += ' --- |'
      }
      markdown += separatorRow + '\n'
      headerProcessed = true
    }
  }

  return markdown
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
 * Main function
 */
function main() {
  const rootDir = path.join(process.cwd(), 'autogen-markdown')
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
  } catch (error) {
    console.error('Error processing directory:', error)
  }
}

// Execute main function
main()
