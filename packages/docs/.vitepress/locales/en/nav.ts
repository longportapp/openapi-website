import type { DefaultTheme } from 'vitepress'

export const nav = (): DefaultTheme.NavItem[] => {
  return [
    { text: 'SDK', link: '/sdk', activeMatch: '^/sdk' },
    { text: 'Docs', link: '/docs/', activeMatch: '^/docs' },
    { text: 'Sock', link: '/sock', activeMatch: '^/sock' },
    { text: 'LLM', link: '/docs/llm', activeMatch: '^/docs/llm' },
    { text: 'Discuss & Feedback', link: 'https://github.com/longportapp/openapi/issues', target: '_blank' },
  ]
}
