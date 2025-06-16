// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import 'virtual:uno.css'

/** Layouts */
import Layout from './layouts/Layout.vue'
/** auto import components */
import * as components from './components'

export default {
  Layout,
  async enhanceApp({ app }) {
    for (const component of Object.keys(components)) {
      app.component(component, components[component])
    }
  },
} satisfies Theme
