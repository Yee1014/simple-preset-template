# mobile-web-preset

## 目录

- [简介](#简介)
- [脚本命令](#脚本命令)
- [注意事项](#注意事项)
- [移动端适配](#移动端适配)

## 简介

- 移动端模版

## 脚本命令

使用此查看方式的 Url 需要拼接 domain 参数

| npm 命令   | 查看方式                    | 说明         |
| ---------- | --------------------------- | ------------ |
| build:dev  |   | Build 开发   |
| build:beta |  | Build 测试用 |
| build:uat  |   | Build 预发布 |
| build:prod |       | Build 正式   |

## 移动端适配

> [VW 相关博客说明](https://juejin.cn/post/6844903571096338439)

一. 安装依赖

```
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-preset-env postcss-viewport-units cssnano --S
npm i cssnano-preset-advanced --save-dev
```

二. 配置 postcss<br>
找到`postcss.config.js`

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-write-svg': {
      uft8: false,
    },
    'postcss-preset-env': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/(\/|\\)(node_modules)(\/|\\)/], // 排除第三方ui
    },
    // 已不在使用
    // "postcss-viewport-units": {},
    // cssnano 4.x 版本使用
    cssnano: {
        preset: [
          'advanced',
          {
            zindex: false,
            autoprefixer: false,	// 和cssnext同样具有autoprefixer，保留一个
            reduceIdents: {
              keyframes: false,
            },
          },
        ],
    },
  },
}
```

三. 引入`viewport-units-buggyfill`解决兼容问题（已不在使用）<br>
在`public/index.html`

```html
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
<script>
  window.onload = function() {
    window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks,
    })
  }
</script>
```

四. 全局样式 img

```css
img {
  content: normal !important;
}
```


