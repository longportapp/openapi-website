// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import './style/index.css'
import 'virtual:group-icons.css' //代码组样式
import 'virtual:uno.css'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'
import zhHK from './locales/zh-HK.json'
import { getCurrentLanguage } from './utils/i18n'
/** Layouts */
import Layout from './layouts/Layout.vue'
/** auto import components */
import * as components from './components'

const i18n = createI18n<[typeof en, typeof zhCN, typeof zhHK], 'en' | 'zh-CN' | 'zh-HK'>({
  locale: getCurrentLanguage(),
  legacy: false,
  messages: {
    en: en,
    'zh-CN': zhCN,
    'zh-HK': zhHK,
  },
})

export default {
  Layout,
  async enhanceApp({ app }) {
    app.use(i18n)
    for (const component of Object.keys(components)) {
      app.component(component, components[component])
    }
  },
} satisfies Theme
