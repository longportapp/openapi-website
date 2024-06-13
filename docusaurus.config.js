// @ts-check
const { lightTheme } = require('./config/theme')
const darkCodeTheme = require('prism-react-renderer/themes/vsDark')
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
            label: '讨论 & 反馈',
            to: 'https://github.com/longportapp/openapi-sdk/issues',
            className: 'navbar-item--icon navbar-item--discussion',
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
            to: 'https://github.com/longportapp/openapi-sdk',
            position: 'right',
            className: 'navbar-item--icon navbar-item--github',
            value: '<span />',
          },
        ],
      },
      prism: {
        theme: lightTheme,
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
