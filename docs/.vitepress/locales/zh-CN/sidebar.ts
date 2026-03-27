import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const lang = 'zh-CN'
const docsSidebar = genMarkdowDocs(lang, 'docs')
const wsApiSidebar = genMarkdowDocs(lang, 'docs/api/ws')

export const sidebar: DefaultTheme.Sidebar = {
  [`/${lang}/docs/api/ws/`]: { base: `/${lang}`, items: wsApiSidebar() },
  [`/${lang}`]: { base: `/${lang}`, items: docsSidebar() },
}
