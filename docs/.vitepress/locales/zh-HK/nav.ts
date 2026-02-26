import type { DefaultTheme } from 'vitepress'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '開發者認證', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文檔', link: `/${lang}/docs`, activeMatch: `^(/en)?/docs(?!/(llm|mcp))` },
    { text: 'MCP', link: '/docs/mcp', activeMatch: '^(/en)?/docs/mcp' },
    { text: 'LLM', link: '/docs/llm', activeMatch: '^(/en)?/docs/llm' },
    { text: '討論 & 反饋', link: 'https://github.com/longportapp/openapi/issues', target: '_blank' },
  ]
}
