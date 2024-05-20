/* eslint-disable @typescript-eslint/no-var-requires */

const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postcssMixins = require('postcss-mixins')

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = () => ({
  name: 'tailwindcss',
  configurePostCss(postCssOptions) {
    postCssOptions.plugins.push(postcssMixins)
    postCssOptions.plugins.push(tailwindcss)
    postCssOptions.plugins.push(autoprefixer)
    return postCssOptions
  },
})
