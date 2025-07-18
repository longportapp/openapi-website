import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const lang = 'zh-HK'
const docsSidebar = genMarkdowDocs(lang, 'docs')

export const sidebar: DefaultTheme.Sidebar = {
  [`/${lang}`]: { base: `/${lang}`, items: docsSidebar() },
}
