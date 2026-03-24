import type { DefaultTheme } from 'vitepress'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '首頁', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'Skill', link: `/${lang}/skill`, activeMatch: `^/${lang}/skill` },
    { text: '文檔', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs(?!/api)` },
    { text: 'API 參考', link: `/${lang}/docs/api`, activeMatch: `^/${lang}/docs/api` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
