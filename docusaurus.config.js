// @ts-check
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const i18n = require('./i18n/config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Longbridge 开放平台',
  url: 'https://open.longbridgeapp.com',
  baseUrl: '/',
  organizationName: 'longbridgeapp',
  projectName: 'openapi-website',
  baseUrlIssueBanner: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n,
  favicon: 'https://pub.lbkrs.com/files/202107/35tULHe3n4Pp4EtA/logo.png',
  plugins: [
    'docusaurus-plugin-sass',
    'docusaurus-tailwindcss',
    function docsWebpackConfig(context, options) {
      return {
        name: 'lb-docs-webpack-plugin',
        configureWebpack(config, isServer, utils, content) {
          if (isServer) return {};
          const docsAssetPrefix = 'openapi-website';
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
          };
        },
      };
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // todo i18n lang should redirect other dir
          editUrl: ({ locale, docPath }) => {
            const nextVersionDocsDirPath = 'docs';
            return `https://github.com/longbridgeapp/openapi-website/edit/main/${nextVersionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [require('mdx-mermaid')],
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
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Longbridge',
          src: 'https://pub.lbkrs.com/files/202204/U8NeviVyPf5Q7ecP/Group_156.png',
        },
        items: [
          {
            to: 'https://open.longbridgeapp.com',
            position: 'left',
            label: '开发者认证',
          },
          {
            to: '/docs',
            activeBasePath: '/docs',
            label: '文档',
            position: 'left',
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
};

module.exports = config;
