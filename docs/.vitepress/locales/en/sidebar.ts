import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const docsSidebar = genMarkdowDocs('en', 'docs')
const wsApiSidebar = genMarkdowDocs('en', 'docs/api/ws')

export const sidebar: DefaultTheme.Sidebar = {
  '/docs/api/ws': wsApiSidebar(),
  '/docs/': docsSidebar(),
}
