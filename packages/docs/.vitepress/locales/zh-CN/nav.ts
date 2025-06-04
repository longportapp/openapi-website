import type { DefaultTheme } from 'vitepress'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文档', link: `/${lang}/docs/`, activeMatch: `^/${lang}/docs` },
    { text: 'Sock', link: `/${lang}/sock`, activeMatch: `^/${lang}/sock` },
    { text: 'LLM', link: `/${lang}/docs/llm`, activeMatch: `^/${lang}/docs/llm` },
    { text: '讨论 & 反馈', link: 'https://github.com/longportapp/openapi/issues', target: '_blank' },
  ]
}
