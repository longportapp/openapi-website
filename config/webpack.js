const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (context, options) => {
  return {
    name: 'lb-docs-webpack-plugin',
    configureWebpack(config, isServer, utils, content) {
      if (isServer) return {}

      const prefix = 'openapi-website'
      return {
        output: {
          filename: `assets/js/${prefix}_[name].[contenthash:8].js`,
          chunkFilename: `assets/js/${prefix}_[name].[contenthash:8].js`,
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: `assets/css/${prefix}_[name].[contenthash:8].css`,
            chunkFilename: `assets/css/${prefix}_[name].[contenthash:8].css`,
            ignoreOrder: true,
          }),
        ],
      }
    },
  }
}
