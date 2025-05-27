import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import Unocss from 'unocss/vite'
import { tipContainerPlugin } from './md-plugins/tip-container'

export default defineConfig({
  title: 'Longbridge',

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  ignoreDeadLinks: true,
  base: '/',
  rewrites: {
    'en/:rest*': ':rest*',
  },
  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        },
      },
    ],
    config(md) {
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'es':
              return 'Copiar código'
            case 'fa':
              return 'کپی کد'
            case 'ko':
              return '코드 복사'
            case 'pt':
              return 'Copiar código'
            case 'ru':
              return 'Скопировать код'
            case 'zh-CN':
              return '复制代码'
            case 'zh-HK':
              return '複製代碼'
            default:
              return 'Copy code'
          }
        })()
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        )
      }
      md.use(groupIconMdPlugin)
      md.use(tabsMarkdownPlugin)
      md.use(tipContainerPlugin)
    },
  },

  sitemap: {
    hostname: 'https://open.longportapp.com',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    },
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Longbridge Open API' }],
    ['meta', { property: 'og:image', content: 'https://pub.pbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png' }],
    ['meta', { property: 'og:url', content: 'https://open.longportapp.com/' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', width: 48, height: 48 },
  },

  locales: {
    root: { label: 'English' },
    'zh-CN': { label: '简体中文' },
    'zh-HK': { label: '繁體中文' },
  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          vitepress: localIconLoader(import.meta.url, '../public/logo.svg'),
        },
      }),
      llmstxt({
        workDir: 'en',
        ignoreFiles: ['index.md'],
      }),
      Unocss({
        configFile: '../unocss.config.ts',
      }),
    ],
  },
})
