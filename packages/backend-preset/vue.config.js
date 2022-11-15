/**
 * vue.config.js
 *
 * @Author  Yee
 * @DATE    create on
 * @DESC
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/_variables.scss";`,
      },
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },
  productionSourceMap: process.env.NODE_ENV !== 'production',
  transpileDependencies: [
    'vue-echarts',
  ],
}
