import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { type DefaultTheme } from 'vitepress'
import { isPageIncluded } from '../../region-utils'

const SIDEBAR_ICONS: Record<string, string> = {
  book: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  terminal: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 9.27 9.27 3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73z"/><path d="M19.5 4.5 18 6l1.5 1.5L21 6z"/><path d="M4.5 19.5 6 18l-1.5-1.5L3 18z"/></svg>`,
}

interface CategoryConfig {
  position?: number
  label?: string
  collapsible?: boolean
  collapsed?: boolean
  link?: string | null | { title: string; slug: string }
  childFileSort?: {
    sortByType: 'ext' | 'dir'
    ext?: string
    sortByName?: string[]
  }[]
}

type MSidebar = DefaultTheme.SidebarItem & { position?: number }

interface GenOptions {
  exclude?: string[]
  debug?: boolean
}

/**
 * Generate navigation items by reading markdown files from a directory
 * @param lang Language code (e.g., 'en', 'zh-CN')
 * @param basePath Base path to read files from (e.g., 'docs')
 * @returns Function that returns an array of navigation items
 */
export function genMarkdowDocs(lang: string, basePath: string, options: GenOptions = {}) {
  return function (): DefaultTheme.SidebarItem[] {
    const docsRoot = path.resolve(process.cwd(), 'docs')
    const rootDir = path.join(docsRoot, lang, basePath)
    const fc = generateSidebarItems(rootDir, `/${basePath}`, `/${basePath}`, 0, docsRoot, options.exclude)
    if (options.debug) {
      fs.writeFileSync(path.resolve(__dirname, `./${lang}_sidebar.json`), JSON.stringify(fc, null, 2))
    }
    return fc
  }
}
/**
 * Read _category_.json configuration file from a directory
 * @param dirPath Directory path
 * @returns CategoryConfig object or null if not found
 */
function readCategoryConfig(dirPath: string): CategoryConfig | null {
  const categoryPath = path.join(dirPath, '_category_.json')
  try {
    if (fs.existsSync(categoryPath)) {
      const content = fs.readFileSync(categoryPath, 'utf8')
      return JSON.parse(content) as CategoryConfig
    }
  } catch (error) {
    console.warn(`Error reading category config at ${categoryPath}:`, error)
  }
  return null
}

/**
 * Sort items based on position property
 * @param items Array of items with position property
 * @returns Sorted array
 */
function sortByPosition<T extends { position?: number }>(items: T[]): T[] {
  return items.sort((a, b) => {
    const posA = a.position ?? Infinity
    const posB = b.position ?? Infinity
    return posA - posB
  })
}

/**
 * Recursively generate navigation items from a directory
 * @param dirPath Directory path to read
 * @param relativePath Relative path for links
 * @returns Array of navigation items
 */
function generateSidebarItems(
  dirPath: string,
  relativePath: string,
  rootPath: string,
  depth = 0,
  docsRoot?: string,
  excludeDirs?: string[]
): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = []

  try {
    const files = fs.readdirSync(dirPath)

    // Process markdown files
    const mdFiles = files.filter((file) => file.endsWith('.md') && file !== '_category_.json')
    const fileItems: MSidebar[] = []

    for (const file of mdFiles) {
      const filePath = path.join(dirPath, file)
      // Region whitelist filtering: skip pages not in the whitelist
      if (docsRoot) {
        const relFromDocs = path.relative(docsRoot, filePath)
        if (!isPageIncluded(relFromDocs)) continue
      }
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      const rawTitle = data['sidebar_label'] || data['title'] || getDefaultTitle(file)
      const iconKey = data['sidebar_icon'] as string | undefined
      const iconHtml = iconKey && SIDEBAR_ICONS[iconKey] ? `<span class="sidebar-item-icon">${SIDEBAR_ICONS[iconKey]}</span>` : ''
      const title = iconHtml ? `${iconHtml}${rawTitle}` : rawTitle
      const slug = data['slug']

      const normalizeLink =
        file === 'index.md' ? `${relativePath}.md` : path.join(relativePath, file.replace('.md', ''))
      const link = slug
        ? path.isAbsolute(slug)
          ? path.join(rootPath, slug)
          : path.join(relativePath, slug)
        : normalizeLink
      const position = data['sidebar_position']

      fileItems.push({
        text: title,
        link,
        position,
      })
    }

    items.push(...fileItems)

    // Process directories
    const directories = files.filter((file) => {
      const stats = fs.statSync(path.join(dirPath, file))
      return stats.isDirectory()
    })

    const dirItems: MSidebar[] = []

    for (const dir of directories) {
      if (depth === 0 && excludeDirs?.includes(dir)) continue
      const subDirPath = path.join(dirPath, dir)
      const subRelativePath = path.join(relativePath, dir)
      const subCategoryConfig = readCategoryConfig(subDirPath)
      const subItems = generateSidebarItems(subDirPath, subRelativePath, rootPath, depth + 1, docsRoot, excludeDirs)

      if (subItems.length > 0) {
        const dirTitle = subCategoryConfig?.label || formatDirName(dir)
        const collapsed = depth === 0 ? false : (subCategoryConfig?.collapsed ?? true)
        const position = subCategoryConfig?.position

        const sidebarItem: MSidebar = {
          text: dirTitle,
          items: subItems,
          collapsed,
          position,
        }

        dirItems.push(sidebarItem)
      }
    }

    items.push(...dirItems)
    return sortByPosition(items as MSidebar[])
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
