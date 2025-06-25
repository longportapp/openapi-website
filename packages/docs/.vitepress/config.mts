import { defineConfig } from 'vitepress'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'
import Unocss from 'unocss/vite'
import { markdownConfig } from './config/markdown'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { localesConfig } from './config/locales'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import matter from 'gray-matter'
import Path from 'node:path'

// 获取文件的 slug
function getFileSlug(filePath: string): string | null {
  const fullPath = resolve(join(dirname(fileURLToPath(import.meta.url)), '..', filePath))

  if (!existsSync(fullPath)) {
    return null
  }

  try {
    const content = readFileSync(fullPath, 'utf-8')
    const { data: frontmatter } = matter(content)

    return frontmatter.slug || null
  } catch (error) {
    console.error('Error reading file:', filePath, error)
    return null
  }
}

export default defineConfig({
  title: 'LongPort Open API',
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

    //首先尝试读取文件的 slug 字段
    const slug = getFileSlug(path)
    if (slug && Path.isAbsolute(slug) && slug !== '/') {
      // 如果存在 slug，重写为 /{locale}/docs/{slug}.md 的形式
      const localeMatch = path.match(/^(en|zh-CN|zh-HK)\//)
      if (localeMatch) {
        const locale = localeMatch[1]
        const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug
        np = `${locale}/docs/${cleanSlug}.md`
      } else {
        // 如果没有匹配到语言，使用默认处理
        np = slug + '.md'
      }
    }

    if (np.includes('en')) {
      np = np.replace('en/', '')
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
    ['meta', { property: 'og:site_name', content: 'LongPort Open API' }],
    ['meta', { property: 'og:image', content: 'https://pub.pbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png' }],
    ['meta', { property: 'og:url', content: 'https://open.longportapp.com/' }],
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
