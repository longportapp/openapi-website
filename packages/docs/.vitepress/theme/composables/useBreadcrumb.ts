import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { useLayout } from 'vitepress/theme'
import type { DefaultTheme } from 'vitepress'

export interface BreadcrumbItem {
  text: string
  link?: string
}

export function useBreadcrumb() {
  const route = useRoute()
  const { sidebar } = useLayout()

  // 递归查找匹配的面包屑路径
  const findBreadcrumbPath = (
    items: DefaultTheme.SidebarItem[],
    targetPath: string,
    currentPath: BreadcrumbItem[] = []
  ): BreadcrumbItem[] | null => {
    for (const item of items) {
      // 确保 text 存在，如果不存在则跳过
      if (!item.text) continue

      const newPath = [...currentPath, { text: item.text, link: item.link }]

      // 如果当前项目的链接匹配目标路径
      if (item.link && normalizePath(item.link) === normalizePath(targetPath)) {
        return newPath
      }

      // 如果有子项目，递归查找
      if (item.items && item.items.length > 0) {
        const childResult = findBreadcrumbPath(item.items, targetPath, newPath)
        if (childResult) {
          return childResult
        }
      }
    }

    return null
  }

  // 标准化路径，处理不同的路径格式
  const normalizePath = (path: string): string => {
    if (!path) return ''

    // 移除开头的 /
    let normalized = path.replace(/^\/+/, '')

    // 移除结尾的 .md
    normalized = normalized.replace(/\.md$/, '')

    // 移除结尾的 /
    normalized = normalized.replace(/\/+$/, '')

    return normalized
  }

  // 计算面包屑导航
  const breadcrumbItems = computed(() => {
    if (!sidebar.value || !route.path) {
      return []
    }

    const currentPath = route.path
    let sidebarItems: DefaultTheme.SidebarItem[] = []

    // 处理不同的 sidebar 格式
    if (Array.isArray(sidebar.value)) {
      sidebarItems = sidebar.value
    } else if (typeof sidebar.value === 'object') {
      // 对于多级 sidebar，尝试找到匹配当前路径的 sidebar
      const keys = Object.keys(sidebar.value)
      for (const key of keys) {
        const normalizedKey = normalizePath(key)
        const normalizedPath = normalizePath(currentPath)

        if (normalizedPath.startsWith(normalizedKey)) {
          const sidebarForKey = sidebar.value[key]
          if (Array.isArray(sidebarForKey)) {
            sidebarItems = sidebarForKey
          }
          break
        }
      }
    }

    if (sidebarItems.length === 0) {
      return []
    }

    const breadcrumbPath = findBreadcrumbPath(sidebarItems, currentPath)
    return breadcrumbPath || []
  })

  return {
    breadcrumbItems,
  }
}
