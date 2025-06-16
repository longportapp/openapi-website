import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const docsSidebar = genMarkdowDocs('en', 'docs')

export const sidebar: DefaultTheme.Sidebar = {
  '/sdk/': [
    {
      text: 'SDK',
      link: 'sdk',
    },
  ],
  '/docs/': { base: '/docs/', items: docsSidebar() },
}
