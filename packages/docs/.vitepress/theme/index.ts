// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import spec from '../../public/openapi.json'
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
    app.component('Sdk', Sdk)
  },
} satisfies Theme
