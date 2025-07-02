import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './nav'
import { search } from './search'
import { sidebar } from './sidebar'
export const zhCNConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  head: [
    ['meta', { property: 'og:url', content: 'https://open.longportapp.com' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'LongPort OpenAPI：灵活支持程序化交易' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'LongPort OpenAPI 为您提供灵活多样的接入服务，满足您的量化交易需求，快速构建您的交易策略。',
      },
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://pub.pbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png' },
    ],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:site_name', content: 'OpenAPI | LongPort 开放平台' }],
    ['link', { rel: 'canonical', href: 'https://open.longportapp.com/zh-CN/' }],
  ],
  title: 'LongPort API 文档',
  description: 'LongPort OpenAPI 为您提供灵活多样的接入服务，满足您的量化交易需求，快速构建您的交易策略。',
  themeConfig: {
    logoLink: {
      link: '/zh-CN',
      target: '_self',
    },
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
