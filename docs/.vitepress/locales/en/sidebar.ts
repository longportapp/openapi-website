import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const docsSidebar = genMarkdowDocs('en', 'docs', { exclude: ['cli'] })
const cliSidebar  = genMarkdowDocs('en', 'docs/cli')

export const sidebar: DefaultTheme.Sidebar = {
  '/docs/cli': cliSidebar(),
  '/docs/':    docsSidebar(),
}
