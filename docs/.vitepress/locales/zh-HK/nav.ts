import type { DefaultTheme } from 'vitepress'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '開發者認證', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文檔', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs(?!/llm|/mcp|/cli)` },
    { text: 'MCP', link: `/${lang}/docs/mcp`, activeMatch: `^/${lang}/docs/mcp` },
    { text: 'CLI', link: `/${lang}/docs/cli`, activeMatch: `^/${lang}/docs/cli` },
    { text: 'LLM', link: `/${lang}/docs/llm`, activeMatch: `^/${lang}/docs/llm` },
    { text: '討論 & 反饋', link: 'https://github.com/longbridge/openapi/issues', target: '_blank' },
  ]
}
