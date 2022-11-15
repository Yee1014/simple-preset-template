import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/_global.scss'
import './assets/css/common.scss'
import { createApp } from 'vue'
import App from './App.vue'
import registerPlugins from '@/plugins'
import { initAppData } from './views/app'

const app = createApp(App)
initAppData().finally(() => {
  registerPlugins(app)
  app.mount('#app')
})
