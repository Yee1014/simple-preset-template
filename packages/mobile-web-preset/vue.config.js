/**
 * vue.config.js
 *
 * @Author
 * @DATE    create on
 * @DESC
 */

const { NODE_ENV } = process.env

const isProduction = NODE_ENV === 'production'

module.exports = {
  // lintOnSave: false,
  devServer: {
    port: 9099,
  },
  publicPath: isProduction ? process.env.VUE_APP_PUBLIC_PATH : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/_variables.scss";`,
      },
    },
  },
  productionSourceMap: !isProduction,
  configureWebpack: config => {
  },
}
