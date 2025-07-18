import { defineConfig } from 'vitepress'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import Unocss from 'unocss/vite'
import { markdownConfig } from './config/markdown'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { localesConfig } from './config/locales'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { rewriteMarkdownPath } from './utils'

export default defineConfig(
  withMermaid({
    title: 'LongPort OpenAPI',
    appearance: true,
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    ignoreDeadLinks: true,
    base: '/',

    srcExclude: ['README.md'],
    rewrites: rewriteMarkdownPath,
    markdown: markdownConfig,

    sitemap: {
      hostname: 'https://open.longportapp.com',
      transformItems(items) {
        return items.filter((item) => !item.url.includes('migration'))
      },
    },

    /* prettier-ignore */
    head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://assets.lbkrs.com/uploads/770073a2-c505-4d41-99f4-93cb75abe257/longport_favicon.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: 'https://open.longportapp.com' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'googlebot', content: 'index,follow' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JNRX7GS04Y' }],
    ['script', {}, `window.dataLayer = window.dataLayer||[];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-JNRX7GS04Y');`],
    ['script', { defer: '', src: 'https://assets.lbkrs.com/pkg/sensorsdata/1.21.13.min.js' }],
    ['script', { async: '', src: 'https://at.alicdn.com/t/c/font_2621450_y740y72ffjq.js' }],
  ],

    themeConfig: {
      logo: {
        src: 'https://pub.pbkrs.com/files/202211/TNosrY77nCxm6rtU/logo-without-title.svg',
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
        // @ts-ignore vite 升级后，类型有问题
        groupIconVitePlugin(),
        // @ts-ignore vite 升级后，类型有问题
        Unocss({
          configFile: '../unocss.config.ts',
        }),
      ],
    },
  })
)
