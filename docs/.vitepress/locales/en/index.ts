import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './nav'
import { search } from './search'
import { sidebar } from './sidebar'
import { logoLink } from '../../theme/utils/link'
export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  head: [
    ['meta', { property: 'og:url', content: 'https://open.longbridge.com' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Longbridge Developers: Build with APIs, LLM, MCP, and CLI' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Explore the Longbridge Developers — open APIs, LLM integrations, MCP support, CLI tools, and more to power your financial applications.',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://assets.lbkrs.com/uploads/48641e8e-a157-4b0f-a58e-bd3998d10d54/group427321346.webp',
      },
    ],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'Developers | Longbridge' }],
  ],
  title: 'Longbridge Developers',
  description:
    'Explore the Longbridge Developers — open APIs, LLM integrations, MCP support, CLI tools, and more to power your financial applications.',
  themeConfig: {
    logoLink: logoLink(),
    nav: nav(),
    sidebar: sidebar,
    search: {
      provider: 'local',
      options: search,
    },
    docFooter: {
      prev: 'Previous Page',
      next: 'Next Page',
    },

    outline: {
      label: 'On this page',
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
}
