import { defineConfig } from 'vitepress'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import Unocss from 'unocss/vite'
import { markdownConfig } from './config/markdown'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { localesConfig } from './config/locales'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { rewriteMarkdownPath } from './utils'
import * as cheerio from 'cheerio'

const insertScript = (html: string) => {
  const $ = cheerio.load(html)
  $('head').prepend(
    `<script>window.__API_PROXY_URL__ = ${JSON.stringify(process.env.VITE_PORTAL_GATEWAY_BASE_URL)}</script>`,
    `<script defer˝ src="https://assets.lbctrl.com/uploads/b63bb77e-74b5-43d3-8bf4-d610be91c838/longport-internal.iife.js"></script>`
  )
  return $.html()
}

export default defineConfig(
  withMermaid({
    title: 'Longbridge OpenAPI',
    appearance: true,
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    ignoreDeadLinks: true,
    base: '/',

    srcExclude: ['README.md'],
    rewrites: rewriteMarkdownPath,
    markdown: markdownConfig,
    transformHtml(code) {
      return insertScript(code)
    },

    sitemap: {
      hostname: 'https://open.longbridge.com',
      transformItems(items) {
        return items.filter((item) => !item.url.includes('migration'))
      },
    },

    /* prettier-ignore */
    head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://pub.lbkrs.com/files/202107/35tULHe3n4Pp4EtA/logo.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: 'https://open.longbridge.com' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-P81Y8BDYYS' }],
    ['script', {}, `window.dataLayer = window.dataLayer||[];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-P81Y8BDYYS');`],
    ['script', { defer: '', src: 'https://assets.lbkrs.com/pkg/sensorsdata/1.21.13.min.js' }],
    ['script', { async: '', src: 'https://at.alicdn.com/t/c/font_2621450_y740y72ffjq.js' }],
  ],
    themeConfig: {
      editLink: {
        pattern: ({ filePath }) => {
          return `https://github.com/longportapp/openapi-website/edit/main/docs/${filePath}`
        },
      },
      logo: {
        src: 'https://assets.lbkrs.com/uploads/f029efba-486b-4c32-8b05-1a87b0fb61f8/logo-without-title-lb.svg',
        width: 48,
        height: 48,
      },
      search: {
        provider: 'local',
      },
    },

    locales: localesConfig,

    vite: {
      ssr: {
        noExternal: ['vue-i18n'],
      },
      server: {
        port: 8000,
        proxy: {
          '/api': {
            target: process.env.VITE_API_BASE_URL || 'https://openapi.longportapp.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
      optimizeDeps: {
        // Exclude vuetify since it has an issue with vite dev - TypeError: makeVExpansionPanelTextProps is not a function - the makeVExpansionPanelTextProps is used before it is defined
        exclude: ['vuetify'],
      },
      build: {
        chunkSizeWarningLimit: 1000,
      },
      resolve: {
        alias: [
          {
            find: '@',
            replacement: dirname(fileURLToPath(new URL('./theme', import.meta.url))),
          },
          {
            find: '~',
            replacement: dirname(fileURLToPath(new URL('../', import.meta.url))),
          },
        ],
      },
      plugins: [
        groupIconVitePlugin(),
        Unocss({
          configFile: '../unocss.config.ts',
        }),

        /**s
         * see https://github.com/vuejs/vitepress/issues/3314
         * 实际上仅会在开发者模式注入
         */
        {
          name: 'inject-extra-script',
          transformIndexHtml(code) {
            return insertScript(code)
          },
        },
      ],
    },
  })
)
