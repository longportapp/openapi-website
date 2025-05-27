import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../utils/gen'

// import { useSidebar } from 'vitepress-openapi'
// import spec from '../public/openapi.json'

const lang = 'zh-CN'
// const sidebar = useSidebar({
//   spec,
//   // Optionally, you can specify a link prefix for all generated sidebar items.
//   linkPrefix: '/sock/',
// })

const docsSidebar = genMarkdowDocs('zh-CN', 'docs')
export default defineAdditionalConfig({
  lang: 'zh-CN',
  description: '长桥 API 文档',

  themeConfig: {
    nav: nav(),

    search: { options: searchOptions() },

    sidebar: {
      [`/${lang}/sdk/`]: [
        {
          text: 'SDK',
          link: 'sdk',
        },
      ],
      [`/${lang}/docs/`]: { base: `/${lang}/docs/`, items: docsSidebar() },
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2025 长桥`,
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
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'SDK',
      link: `/${lang}/sdk`,
    },
    {
      text: '文档',
      link: `/${lang}/docs/`,
    },
    {
      text: 'LLM',
      link: `/${lang}/llm/learn`,
    },
    {
      text: '讨论 & 反馈',
      link: 'https://github.com/longportapp/openapi/issues',
      target: '_blank',
    },
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'API 附录',
      items: [
        { text: '通用错误码', link: 'error-codes' },
        { text: '获取 Token', link: 'how-to-access-api' },
        { text: '刷新 Token', link: 'refresh-token-api' },
        {
          text: '长连接',
          base: `/${lang}/api-reference/socket/`,
          items: [
            { text: '本地 Host', link: 'hosts' },
            { text: '订阅行情推送', link: 'how_to_subscribe_quote' },
          ],
        },
      ],
    },
  ]
}

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消',
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除',
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接',
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者',
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈',
        },
      },
    },
  }
}
