import type { DefaultTheme } from 'vitepress'

export const nav = (lang: string): DefaultTheme.NavItem[] => {
  return [
    { text: '開發者認證', link: `/${lang}/`, activeMatch: `^/${lang}/$` },
    { text: 'SDK', link: `/${lang}/sdk`, activeMatch: `^/${lang}/sdk` },
    { text: '文檔', link: `/${lang}/docs`, activeMatch: `^/${lang}/docs(?!/llm)` },
    { text: 'LLM', link: `/${lang}/docs/llm`, activeMatch: `^/${lang}/docs/llm` },
    { text: '討論 & 反饋', link: 'https://github.com/longportapp/openapi/issues', target: '_blank' },
  ]
}
