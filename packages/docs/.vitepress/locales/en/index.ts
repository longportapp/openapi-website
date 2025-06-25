import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './nav'
import { search } from './search'
import { sidebar } from './sidebar'
export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'LongPort Open API',
  description: 'LongPort Open API',
  themeConfig: {
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
}
