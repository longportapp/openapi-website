import type { DefaultTheme } from 'vitepress'
import { filterNavItems, getRegion } from '../../region-utils'

export const nav = (): DefaultTheme.NavItem[] => {
  const isCN = getRegion() === 'cn'
  return filterNavItems([
    { text: 'Home', link: '/', activeMatch: '^(/en)?/$' },
    { text: 'Skill', link: '/skill', activeMatch: '^(/en)?/skill' },
    { text: 'Docs', link: '/docs', activeMatch: '^(/en)?/docs(?!/cli)(?!/api)' },
    { text: 'CLI', link: '/docs/cli', activeMatch: '^(/en)?/docs/cli' },
    { text: 'API Reference', link: '/docs/api', activeMatch: '^(/en)?/docs/api' },
    { text: 'SDK', link: '/sdk', activeMatch: '^(/en)?/sdk' },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ])
}
