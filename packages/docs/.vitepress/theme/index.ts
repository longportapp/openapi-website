// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import { theme, useOpenapi } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
import spec from '../../public/openapi.json'
import 'virtual:uno.css'

/** Layouts */
import Layout from './layouts/Layout.vue'
/** auto import components */
import * as components from './components'

export default {
  Layout,
  async enhanceApp({ app }) {
    const openapi = useOpenapi({
      spec,
      config: {},
    })
    theme.enhanceApp({ app, openapi } as any)
    for (const component of Object.keys(components)) {
      app.component(component, components[component])
    }
  },
} satisfies Theme
