import type { DefaultTheme } from 'vitepress'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '开发者认证', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文档', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs(?!/(llm|mcp))` },
    { text: 'LLM', link: `/${lang}/docs/llm`, activeMatch: `^/${lang}/docs/llm` },
    { text: 'MCP', link: `/${lang}/docs/mcp`, activeMatch: `^/${lang}/docs/mcp` },
    { text: '讨论 & 反馈', link: 'https://github.com/longportapp/openapi/issues', target: '_blank' },
  ]
}
