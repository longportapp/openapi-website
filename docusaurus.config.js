// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const i18n = require('./i18n/config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const openapiDomain = 'https://open.longportapp.com'
const communityDomain = 'https://longportapp.com'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LongPort OpenAPI',
  url: 'https://open.longportapp.com',
  baseUrl: '/',
  organizationName: 'longportapp',
  projectName: 'openapi-website',
  baseUrlIssueBanner: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  i18n,
  customFields: {
    isDev: process.env.STAGE === 'dev',
  },
  favicon: 'https://pub.lbkrs.com/static/offline/202211/qohHsXzN9qtQ23ox/longport_favicon.png',
  plugins: [
    'docusaurus-plugin-sass',
    function docusaurusTailwindCss() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss: function configurePostCss(postCssOptions) {
          postCssOptions.plugins.push(require('tailwindcss'))
          postCssOptions.plugins.push(require('autoprefixer'))
          return postCssOptions
        },
      }
    },
    function docsWebpackConfig(context, options) {
      return {
        name: 'lb-docs-webpack-plugin',
        configureWebpack(config, isServer, utils, content) {
          if (isServer) return {}
          const docsAssetPrefix = 'openapi-website'
          return {
            output: {
              filename: `assets/js/${docsAssetPrefix}_[name].[contenthash:8].js`,
              chunkFilename: `assets/js/${docsAssetPrefix}_[name].[contenthash:8].js`,
            },
            plugins: [
              new MiniCssExtractPlugin({
                filename: `assets/css/${docsAssetPrefix}_[name].[contenthash:8].css`,
                chunkFilename: `assets/css/${docsAssetPrefix}_[name].[contenthash:8].css`,
                ignoreOrder: true,
              }),
            ],
          }
        },
      }
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // todo I18n lang should redirect other dir
          editUrl: ({ locale, docPath }) => {
            const isAutoGenDoc = docPath.includes('--autogen.md')

            let nextVersionDocsDirPath = 'docs'
            if (isAutoGenDoc) {
              docPath = docPath.replace('--autogen.md', '.yml')
              nextVersionDocsDirPath = 'swagger-docs'
            }

            if (locale !== 'zh-CN') {
              let targetPath = `i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`
              if (isAutoGenDoc) {
                targetPath = `${nextVersionDocsDirPath}/${locale}/${docPath}`
              }
              return `https://github.com/longportapp/openapi-website/edit/main/${targetPath}`
            } else {
              if (docPath.includes('--autogen.md')) {
                docPath = docPath.replace('--autogen.md', '.yml')
                nextVersionDocsDirPath = 'swagger-docs'
              }
              return `https://github.com/longportapp/openapi-website/edit/main/${nextVersionDocsDirPath}/${docPath}`
            }
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarCollapsed: false,
          sidebarCollapsible: false,
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'og:image',
          content: 'https://pub.lbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png',
        },
        {
          name: 'twitter:image',
          content: 'https://pub.lbkrs.com/files/202211/sJswdGqSX1xDqrES/lonport-seo-img.png',
        },
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'LongPort',
          href: openapiDomain,
          target: '_self',
          src: 'https://pub.lbkrs.com/files/202211/BoUn1BSQuAHDX4GY/logo-with-title.svg',
        },
        items: [
          {
            to: openapiDomain,
            position: 'left',
            target: '_self',
            label: '开发者认证',
            activeBaseRegex: '^/$',
          },
          {
            to: `/sdk`,
            label: 'SDK',
            target: '_self',
            position: 'left',
          },
          {
            to: '/docs',
            activeBasePath: '/docs',
            label: '文档',
            position: 'left',
          },
          {
            to: communityDomain,
            label: '社区',
            target: '_self',
            position: 'left',
          },
          {
            to: `${communityDomain}/markets`,
            target: '_self',
            label: '市场',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
            className: 'search-container',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'html',
            position: 'right',
            value: `
            <a href="https://github.com/longportapp/openapi-website" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:26px;height:26px">
              <svg height="26" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="26" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </a>
          `,
            className: 'github-container',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['shell-session', 'http', 'protobuf', 'rust', 'java', 'go'],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'E5GVH515OK',

        // Public API key: it is safe to commit it
        apiKey: '06b2d0933abc228a5979d16d1af26c0b',

        // 默认 index 是简体中文，其它语言需要动态切 indexName，逻辑在 SearchBar.tsx
        indexName: 'open-longportapp',

        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
    }),
}

module.exports = config
