import { DefaultTheme } from 'vitepress'
import { genMarkdowDocs } from '../../theme/utils/gen'

const lang = 'zh-CN'
const docsSidebar = genMarkdowDocs(lang, 'docs')

export const sidebar: DefaultTheme.Sidebar = {
  [`/${lang}/sdk/`]: [
    {
      text: 'SDK',
      link: 'sdk',
    },
  ],
  [`/${lang}/docs/`]: { base: `/${lang}/docs/`, items: docsSidebar() },
}
