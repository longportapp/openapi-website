import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './nav'
import { search } from './search'
import { sidebar } from './sidebar'
export const zhHKConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  head: [
    ['meta', { property: 'og:url', content: 'https://open.longbridge.com' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Longbridge OpenAPI：靈活支持程序化交易' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Longbridge OpenAPI 為您提供靈活多樣的接入服務，滿足您的量化交易需求，快速構建您的交易策略。',
      },
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://pub.pbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png' },
    ],
    ['meta', { property: 'og:locale', content: 'zh-HK' }],
    ['meta', { property: 'og:site_name', content: 'OpenAPI | Longbridge 開放平臺' }],
    ['link', { rel: 'canonical', href: 'https://open.longbridge.com/zh-HK/' }],
  ],
  title: 'Longbridge API 文檔',
  description: 'Longbridge OpenAPI 為您提供靈活多樣的接入服務，滿足您的量化交易需求，快速構建您的交易策略。',

  themeConfig: {
    logoLink: {
      link: '/zh-HK',
      target: '_self',
    },
    nav: nav('zh-HK'),
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: search,
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
