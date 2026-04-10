import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const lang = 'zh-CN'
const docsSidebar = genMarkdowDocs(lang, 'docs', { exclude: ['cli'] })
const cliSidebar  = genMarkdowDocs(lang, 'docs/cli')

export const sidebar: DefaultTheme.Sidebar = {
  [`/${lang}/docs/cli`]: { base: `/${lang}/docs/cli/`, items: cliSidebar() },
  [`/${lang}/docs/`]:    { base: `/${lang}/`, items: docsSidebar() },
}
