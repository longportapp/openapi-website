import type { DefaultTheme } from 'vitepress'

export const nav = (): DefaultTheme.NavItem[] => {
  return [
    { text: 'Developer', link: '/', activeMatch: '^(/en)?/$' },
    { text: 'SDK', link: '/sdk', activeMatch: '^(/en)?/sdk' },
    { text: 'Docs', link: '/docs', activeMatch: `^(/en)?/docs(?!/llm|/mcp)` },
    { text: 'MCP', link: '/docs/mcp', activeMatch: '^(/en)?/docs/mcp' },
    { text: 'LLM', link: '/docs/llm', activeMatch: '^(/en)?/docs/llm' },
    { text: 'Discuss & Feedback', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
