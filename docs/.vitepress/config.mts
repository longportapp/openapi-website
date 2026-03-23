import { defineConfig } from 'vitepress'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import Unocss from 'unocss/vite'
import { markdownConfig } from './config/markdown'
import { dirname, resolve } from 'node:path'
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
    title: 'Longbridge Developers',
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
    transformHead(context) {
      const { page } = context
      let localePathname = page.replace(/\.md$/, '')
      if (localePathname.includes('index')) {
        localePathname = localePathname.replace('index', '')
      }
      const pathname = localePathname.replace('zh-CN/', '').replace('zh-HK/', '')

      // AI/agent-friendly markdown discovery link
      // e.g. en/docs/getting-started.md -> /docs/getting-started.md
      //      zh-CN/docs/index.md      -> /zh-CN/docs.md
      let markdownPath = page.startsWith('en/') ? page.slice(3) : page
      if (markdownPath.endsWith('/index.md')) {
        markdownPath = markdownPath.replace('/index.md', '.md')
      }

      return [
        ['link', { rel: 'canonical', href: `https://open.longbridge.com/${localePathname}` }],
        ['link', { rel: 'alternate', hreflang: 'en', href: `https://open.longbridge.com/${pathname}` }],
        ['link', { rel: 'alternate', hreflang: 'zh-Hans', href: `https://open.longbridge.com/zh-CN/${pathname}` }],
        ['link', { rel: 'alternate', hreflang: 'zh-Hant', href: `https://open.longbridge.com/zh-HK/${pathname}` }],
        ['link', { rel: 'alternate', type: 'text/markdown', href: `https://open.longbridge.com/${markdownPath}` }],
      ]
    },

    sitemap: {
      hostname: 'https://open.longbridge.com',
      transformItems(items) {
        return items.filter((item) => !item.url.includes('migration'))
      },
    },

    /* prettier-ignore */
    head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://assets.wbrks.com/assets/logo/logo1.png' }],
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
          return `https://github.com/longbridge/developers/edit/main/docs/${filePath}`
        },
      },
      logo: {
        src: 'https://assets.wbrks.com/assets/logo/logo-without-title-lb.svg',
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
            target: process.env.VITE_API_BASE_URL || 'https://openapi.longbridge.com',
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
          configFile: resolve(dirname(fileURLToPath(import.meta.url)), '../unocss.config.ts'),
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
