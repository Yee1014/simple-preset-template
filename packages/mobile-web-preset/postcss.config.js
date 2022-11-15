module.exports = file => {
  const isVant = file.file.includes('node_modules/vant')
  // 模块组件库视图是375px
  const designWidth = isVant ? 375 : 750
  return {
    plugins: {
      // autoprefixer: {}
      'postcss-import': {},
      'postcss-url': {},
      'postcss-aspect-ratio-mini': {},
      'postcss-write-svg': {
        utf8: false,
      },
      'postcss-preset-env': {}, // 弃用postcss-cssnext
      'postcss-px-to-viewport': {
        viewportWidth: designWidth, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines', '.ignore-px'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
        exclude: [/(\/|\\)(node_modules)(\/|\\)/],
      },
      cssnano: {
        preset: [
          'advanced',
          {
            zindex: false,
            autoprefixer: false,
            reduceIdents: {
              keyframes: false,
            },
          },
        ],
      },
    },
  }
}
