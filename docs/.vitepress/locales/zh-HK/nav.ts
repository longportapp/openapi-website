import type { DefaultTheme } from 'vitepress'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '首頁', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'Skill', link: `/${lang}/skill`, activeMatch: `^/${lang}/skill` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文檔', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs` },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
