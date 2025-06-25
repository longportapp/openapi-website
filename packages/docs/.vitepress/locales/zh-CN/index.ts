import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './nav'
import { search } from './search'
import { sidebar } from './sidebar'
export const zhCNConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'LongPort API 文档',
  description: 'LongPort API 文档',

  themeConfig: {
    nav: nav('zh-CN'),
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: search,
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页',
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
  },
}
