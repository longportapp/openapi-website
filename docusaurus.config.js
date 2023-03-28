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
  organizationName: 'longbridgeapp',
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
              return `https://github.com/longbridgeapp/openapi-website/edit/main/${targetPath}`
            } else {
              if (docPath.includes('--autogen.md')) {
                docPath = docPath.replace('--autogen.md', '.yml')
                nextVersionDocsDirPath = 'swagger-docs'
              }
              return `https://github.com/longbridgeapp/openapi-website/edit/main/${nextVersionDocsDirPath}/${docPath}`
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
            label: 'Developer',
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
            label: 'Docs',
            position: 'left',
          },
          {
            to: communityDomain,
            label: 'LongPort',
            target: '_self',
            position: 'left',
          },
          {
            to: `${communityDomain}/markets`,
            target: '_self',
            label: 'Market',
            position: 'left',
          },

          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/longbridgeapp/openapi-website',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['shell-session', 'http', 'protobuf', 'rust'],
      },
    }),
}

module.exports = config
