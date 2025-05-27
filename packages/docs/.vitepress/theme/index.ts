// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import spec from '../../public/openapi.json'
import 'virtual:uno.css'
import TipContainer from './components/TipContainer.vue'

import Sdk from './components/sdk.vue'
import SDKLinks from './components/sdkLink.vue'
import Tabs from './components/Tabs.vue'
import TabItem from './components/TabItem.vue'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    const openapi = useOpenapi({
      spec,
      config: {},
    })
    theme.enhanceApp({ app, openapi } as any)
    app.component('SDK', Sdk)
    app.component('SDKLinks', SDKLinks)
    app.component('TipContainer', TipContainer)
    app.component('Tabs', Tabs)
    app.component('TabItem', TabItem)
  },
} satisfies Theme
