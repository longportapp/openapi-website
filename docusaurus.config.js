// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const i18n = require("./i18n/config");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Longbridge 开放平台",
  url: "https://open.longbridgeapp.com",
  baseUrl: "/",
  organizationName: "longbridgeapp",
  projectName: "openapi-website",
  baseUrlIssueBanner: false,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  i18n,
  favicon: "https://pub.lbkrs.com/files/202107/gmrC7fXdNq1nwTsm/new-ico.png",
  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // todo i18n lang should redirect other dir
          editUrl: ({ locale, docPath }) => {
            const nextVersionDocsDirPath = "docs";
            return `https://github.com/longbridgeapp/openapi-website/edit/main/${nextVersionDocsDirPath}/${docPath}`;
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        blog: false,
        theme: {
          customCss: [require.resolve("./src/css/custom.scss")]
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Longbridge OpenAPI",
        logo: {
          alt: "Longbridge",
          src: "https://pub.lbkrs.com/files/202107/gmrC7fXdNq1nwTsm/new-ico.png"
        },
        items: [
          {
            to: "https://open.longbridgeapp.com/developers",
            position: "left",
            label: "开发者认证"
          },
          {
            to: "https://open.longbridgeapp.com/sdk",
            label: "SDK",
            position: "left"
          },
          {
            href: "/docs",
            label: "文档",
            position: "left"
          },
          {
            type: "localeDropdown",
            position: "right"
          },
          {
            href: "https://github.com/longbridgeapp/openapi-website",
            label: "GitHub",
            position: "right"
          }
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["shell-session", "http"]
      }
    })
};

module.exports = config;
