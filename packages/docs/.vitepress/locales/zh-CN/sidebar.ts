import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'
import spec from '../../../public/openapi.json'
import { useSidebar } from 'vitepress-openapi'

const lang = 'zh-CN'
const docsSidebar = genMarkdowDocs(lang, 'docs')
const openAPISidebar = useSidebar({
  spec,
})

export const sidebar: DefaultTheme.Sidebar = {
  [`/${lang}/sdk/`]: [
    {
      text: 'SDK',
      link: 'sdk',
    },
  ],
  [`/${lang}/docs/`]: { base: `/${lang}/docs/`, items: docsSidebar() },
  [`/${lang}/sock/`]: {
    base: `/${lang}/sock/`,
    items: [
      {
        text: 'Sock',
        collapsed: true,
        items: openAPISidebar.generateSidebarGroups(),
      },
    ],
  },
}
