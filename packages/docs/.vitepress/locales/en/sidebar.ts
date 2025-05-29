import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'
import spec from '../../../public/openapi.json'
import { useSidebar } from 'vitepress-openapi'

const docsSidebar = genMarkdowDocs('en', 'docs')
const openAPISidebar = useSidebar({
  spec,
})

export const sidebar: DefaultTheme.Sidebar = {
  '/sdk/': [
    {
      text: 'SDK',
      link: 'sdk',
    },
  ],
  '/docs/': { base: '/docs/', items: docsSidebar() },
  '/sock/': {
    base: 'sock/',
    items: [
      {
        text: 'Sock',
        collapsed: true,
        items: openAPISidebar.generateSidebarGroups(),
      },
    ],
  },
}
