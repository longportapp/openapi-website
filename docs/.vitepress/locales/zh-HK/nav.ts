import type { DefaultTheme } from 'vitepress'
import { filterNavItems, getRegion } from '../../region-utils'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  const isCN = getRegion() === 'cn'
  return filterNavItems([
    { text: '首頁', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'Skill', link: `/${lang}/skill`, activeMatch: `^/${lang}/skill` },
    isCN
      ? { text: 'CLI', link: `/${lang}/docs/cli`, activeMatch: `^/${lang}/docs/cli` }
      : { text: '文檔', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs(?!/api)` },
    { text: 'API 參考', link: `/${lang}/docs/api`, activeMatch: `^/${lang}/docs/api` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ])
}
