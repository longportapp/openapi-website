import type { DefaultTheme } from 'vitepress'

export const nav = (): DefaultTheme.NavItem[] => {
  return [
    { text: 'Home', link: '/', activeMatch: '^(/en)?/$' },
    { text: 'SDK', link: '/sdk', activeMatch: '^(/en)?/sdk' },
    { text: 'Docs', link: '/docs', activeMatch: `^(/en)?/docs(?!/llm|/mcp|/cli)` },
    { text: 'MCP', link: '/docs/mcp', activeMatch: '^(/en)?/docs/mcp' },
    { text: 'CLI', link: '/docs/cli', activeMatch: '^(/en)?/docs/cli' },
    { text: 'LLM', link: '/docs/llm', activeMatch: '^(/en)?/docs/llm' },
    { text: 'Issues', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
