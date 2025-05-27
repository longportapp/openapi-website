import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from './utils/gen'

// import { useSidebar } from 'vitepress-openapi'
// import spec from './public/openapi.json'

// const openAPISidebar = useSidebar({
//   spec,
//   // Optionally, you can specify a link prefix for all generated sidebar items.
//   linkPrefix: '/socks/',
// })

// Generate nav items by reading markdown files
const docsSidebar = genMarkdowDocs('en', 'docs')
export default defineAdditionalConfig({
  lang: 'en-US',
  description: 'Longbridge API Documentation',

  themeConfig: {
    nav: generateNav(),

    search: { options: searchOptions() },

    sidebar: {
      '/sdk/': [
        {
          text: 'SDK',
          link: 'sdk',
        },
      ],
      '/docs/': { base: '/docs/', items: docsSidebar() },
    },

    footer: {
      message: 'Published under MIT License',
      copyright: `Copyright © 2025 Longbridge`,
    },

    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page',
    },

    outline: {
      label: 'Page Navigation',
    },

    lastUpdated: {
      text: 'Last Updated',
    },

    notFound: {
      title: 'Page Not Found',
      quote:
        "But if you don't change direction and continue to search, you may eventually reach the place you are going.",
      linkLabel: 'Go to Homepage',
      linkText: 'Take Me Back to Homepage',
    },

    langMenuLabel: 'Language',
    returnToTopLabel: 'Return to Top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to Light Mode',
    darkModeSwitchTitle: 'Switch to Dark Mode',
    skipToContentLabel: 'Skip to Content',
  },
})

function generateNav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'SDK',
      link: '/sdk',
    },
    {
      text: 'Docs',
      link: '/docs',
      activeMatch: '/docs/',
    },
    {
      text: 'LLM',
      link: '/docs/llm',
    },
    {
      text: 'Discord',
      link: 'https://github.com/longportapp/openapi/issues',
      target: '_blank',
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'First',
      collapsed: false,
      items: [
        { text: 'What is Longbridge API?', link: 'introduction' },
        { text: 'Longbridge API Documentation', link: 'getting-started' },
      ],
    },
    { text: 'LLM', base: '/docs/', link: 'llm' },
    // 这样可以链接到其他的页面或链接
    // { text: '配置和 API 参考', base: '/zh/reference/', link: 'site-config' },
  ]
}

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    placeholder: 'Search Documentation',
    translations: {
      button: {
        buttonText: 'Search Documentation',
        buttonAriaLabel: 'Search Documentation',
      },
      modal: {
        searchBox: {
          resetButtonTitle: 'Clear Query Conditions',
          resetButtonAriaLabel: 'Clear Query Conditions',
          cancelButtonText: 'Cancel',
          cancelButtonAriaLabel: 'Cancel',
        },
        startScreen: {
          recentSearchesTitle: 'Search History',
          noRecentSearchesText: 'No Search History',
          saveRecentSearchButtonTitle: 'Save to Search History',
          removeRecentSearchButtonTitle: 'Remove from Search History',
          favoriteSearchesTitle: 'Favorites',
          removeFavoriteSearchButtonTitle: 'Remove from Favorites',
        },
        errorScreen: {
          titleText: 'Unable to get results',
          helpText: 'You may need to check your network connection',
        },
        footer: {
          selectText: 'Select',
          navigateText: 'Switch',
          closeText: 'Close',
          searchByText: 'Search Provider',
        },
        noResultsScreen: {
          noResultsText: 'No results found',
          suggestedQueryText: 'You can try to query',
          reportMissingResultsText: 'You think this query should have results?',
          reportMissingResultsLinkText: 'Click to feedback',
        },
      },
    },
  }
}
