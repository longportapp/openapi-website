import { defineConfig } from 'vitepress'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'
import Unocss from 'unocss/vite'
import { markdownConfig } from './config/markdown'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { localesConfig } from './config/locales'

export default defineConfig({
  title: 'Longbridge',
  appearance: 'dark',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  ignoreDeadLinks: true,
  base: '/',

  srcExclude: ['README.md'],
  rewrites: (path) => {
    /** hack path route */
    let np = path
    if (np.includes('en')) {
      np = np.replace('en/', '')
    }
    // 保持原有 SEO 路径
    if (np.includes('/api-reference')) {
      np = np.replace('/api-reference', '')
    }
    // 保持原有 /socket/socket-otp-api.md SEO 路径
    if (np.includes('/socket/socket-otp-api.md')) {
      np = np.replace('/socket', '')
    }
    // 重写 /:reset.md 文件为 :reset/index.md
    if (np.endsWith('.md') && !np.includes('index.md')) {
      np = np.replace(/\.md$/, '/index.md')
    }
    return np
  },
  markdown: markdownConfig,

  sitemap: {
    hostname: 'https://open.longportapp.com',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    },
  },

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'https://assets.lbctrl.com/uploads/76e9147c-76a5-4242-b90f-e3841cf50c46/longbridge-openapi.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Longbridge Open API' }],
    ['meta', { property: 'og:image', content: 'https://pub.pbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png' }],
    ['meta', { property: 'og:url', content: 'https://open.longportapp.com/' }],
  ],

  themeConfig: {
    logo: {
      src: 'https://assets.lbctrl.com/uploads/76e9147c-76a5-4242-b90f-e3841cf50c46/longbridge-openapi.svg',
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
          target: 'https://openapi.longportapp.com',
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
      llmstxt({
        workDir: 'en',
        ignoreFiles: ['index.md', 'README.md', 'sock/operations/*'],
      }),
      Unocss({
        configFile: '../unocss.config.ts',
      }),
    ],
  },
})
