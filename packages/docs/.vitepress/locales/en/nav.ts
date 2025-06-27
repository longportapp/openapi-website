import type { DefaultTheme } from 'vitepress'

export const nav = (): DefaultTheme.NavItem[] => {
  return [
    { text: 'Developer Center', link: '/', activeMatch: '^(/en)?/$' },
    { text: 'SDK', link: '/sdk', activeMatch: '^(/en)?/sdk' },
    { text: 'Docs', link: '/docs/', activeMatch: `^(/en)?/docs(?!/llm)` },
    { text: 'LLM', link: '/docs/llm', activeMatch: '^(/en)?/docs/llm' },
    { text: 'Discuss & Feedback', link: 'https://github.com/longportapp/openapi/issues', target: '_blank' },
  ]
}
