import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './nav'
import { search } from './search'
import { sidebar } from './sidebar'
export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  head: [
    ['meta', { property: 'og:url', content: 'https://open.longbridge.com' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Longbridge OpenAPI: Flexible Support for Programmatic Trading' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Access Longbridge OpenAPI for diversified and flexible support tailored to your programmatic trading needs. Enhance your trading strategies with ease.',
      },
    ],
    [
      'meta',
      { property: 'og:image', content: 'https://pub.pbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png' },
    ],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'OpenAPI | Longbridge' }],
    ['link', { rel: 'canonical', href: 'https://open.longbridge.com/' }],
  ],
  title: 'Longbridge OpenAPI',
  description:
    'Access Longbridge OpenAPI for diversified and flexible support tailored to your programmatic trading needs. Enhance your trading strategies with ease.',
  themeConfig: {
    logoLink: {
      link: '/',
      target: '_self',
    },
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
