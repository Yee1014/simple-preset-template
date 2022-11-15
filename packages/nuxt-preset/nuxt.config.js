// 获取打包模式
function getModeEnv () {
  const mode = process.env.NODE_MODE
  let env = '.env.local'
  if (mode) {
    env = `.env.${mode}`
  }
  return env
}

const envConfig = require('dotenv').config({ path: getModeEnv() }).parsed

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,height=device-height,initial-scale=0.3,maximum-scale=1.0,user-scalable=no'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '舱单,上海港舱单,海运舱单,舱单信息,舱单发送'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt'
      },
      {
        hid: 'x-ua-compatible',
        name: 'X-UA-Compatible',
        content: 'IE=edge,chrome=1'
      },
      {
        hid: 'renderer',
        name: 'renderer',
        content: 'webkit'
      },
      {
        hid: 'force-rendering',
        name: 'force-rendering',
        content: 'webkit'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1258743_qu2j373mfb9.css'
      }
    ],
    script: [
      {
        src: envConfig.PUBLIC_JS,
        async: true,
        defer: true,
        body: true
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Router
   */
  router: {
    base: '/'
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '~assets/css/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/tongji.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/router', { path: './router', fileName: 'index.js' }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { filename: getModeEnv() }],
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    credentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    },
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
    }
  },
  styleResources: {
    // your settings here
    scss: ['./assets/css/variables.scss']
  },
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
