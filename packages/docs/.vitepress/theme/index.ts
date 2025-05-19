// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import spec from '../../public/openapi.json'
import 'virtual:uno.css'

import Sdk from './components/sdk.vue'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    const openapi = useOpenapi({
      spec,
      config: {},
    })
    theme.enhanceApp({ app, openapi } as any)
    enhanceAppWithTabs(app)
    app.component('SDK', Sdk)
  },
} satisfies Theme
