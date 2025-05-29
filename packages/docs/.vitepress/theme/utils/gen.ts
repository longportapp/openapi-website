import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { type DefaultTheme } from 'vitepress'

type Config = {
  [key: string]: {
    collapsed?: boolean
  }
}
/**
 * Generate navigation items by reading markdown files from a directory
 * @param lang Language code (e.g., 'en', 'zh-CN')
 * @param basePath Base path to read files from (e.g., 'docs')
 * @returns Function that returns an array of navigation items
 */
export function genMarkdowDocs(lang: string, basePath: string, config?: Config) {
  return function (): DefaultTheme.SidebarItem[] {
    const rootDir = path.resolve(__dirname, '../../../', lang, basePath)
    return generateSidebarItems(rootDir, '', config)
  }
}

/**
 * Recursively generate navigation items from a directory
 * @param dirPath Directory path to read
 * @param relativePath Relative path for links
 * @param lang Language code (e.g., 'en', 'zh-CN')
 * @returns Array of navigation items
 */
function generateSidebarItems(
  dirPath: string,
  relativePath: string,
  config?: Config,
  level = 0
): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = []

  try {
    const files = fs.readdirSync(dirPath)

    const mdFiles = files.filter((file) => file.endsWith('.md'))
    for (const file of mdFiles) {
      const filePath = path.join(dirPath, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      const title = data['title'] || getDefaultTitle(file)
      const link = data['link'] || path.join(relativePath, file.replace('.md', ''))
      const params = {
        text: title,
        link,
      }
      items.push(params)
    }

    // Process directories
    const directories = files.filter((file) => {
      const stats = fs.statSync(path.join(dirPath, file))
      return stats.isDirectory()
    })

    for (const dir of directories) {
      const subDirPath = path.join(dirPath, dir)
      const subRelativePath = path.join(relativePath, dir)
      const subItems = generateSidebarItems(subDirPath, subRelativePath, config, level + 1)

      if (subItems.length > 0) {
        const dirTitle = formatDirName(dir)
        items.push({
          text: dirTitle,
          items: subItems,
          collapsed: level > 0,
        } as DefaultTheme.SidebarItem)
      }
    }

    return items
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return []
  }
}

/**
 * Format directory name to a more readable format
 * @param dirName Directory name
 * @returns Formatted directory name
 */
function formatDirName(dirName: string): string {
  // Convert kebab-case to Title Case
  return dirName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/**
 * Get default title from file name
 * @param fileName File name
 * @returns Formatted title
 */
function getDefaultTitle(fileName: string): string {
  // Remove extension and convert to Title Case
  return fileName
    .replace('.md', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
