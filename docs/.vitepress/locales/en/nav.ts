import type { DefaultTheme } from 'vitepress'

export const nav = (): DefaultTheme.NavItem[] => {
  return [
    { text: 'Home', link: '/', activeMatch: '^(/en)?/$' },
    { text: 'Skill', link: '/skill', activeMatch: '^(/en)?/skill' },
    { text: 'Docs', link: '/docs', activeMatch: '^(/en)?/docs(?!/api)' },
    { text: 'API Reference', link: '/docs/api', activeMatch: '^(/en)?/docs/api' },
    { text: 'SDK', link: '/sdk', activeMatch: '^(/en)?/sdk' },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
