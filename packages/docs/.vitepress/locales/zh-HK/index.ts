import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './nav'
import { search } from './search'
import { sidebar } from './sidebar'
export const zhHKConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: '長橋 API 文檔',
  description: '長橋 API 文檔',

  themeConfig: {
    nav: nav('zh-HK'),
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: search,
    },

    footer: {
      message: '基於 MIT 許可發佈',
      copyright: `版權所有 © 2025 長橋`,
    },

    docFooter: {
      prev: '上一頁',
      next: '下一頁',
    },

    outline: {
      label: '頁面導航',
    },

    lastUpdated: {
      text: '最後更新於',
    },

    notFound: {
      title: '頁面未找到',
      quote: '但如果你不改變方向，並且繼續尋找，你可能最終會到達你所前往的地方。',
      linkLabel: '前往首頁',
      linkText: '帶我回首頁',
    },

    langMenuLabel: '多語言',
    returnToTopLabel: '回到頂部',
    sidebarMenuLabel: '菜單',
    darkModeSwitchLabel: '主題',
    lightModeSwitchTitle: '切換到淺色模式',
    darkModeSwitchTitle: '切換到深色模式',
    skipToContentLabel: '跳轉到內容',
  },
}
