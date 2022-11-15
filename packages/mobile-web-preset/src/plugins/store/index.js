import { createStore } from 'vuex'
import app from './modules/app'
import baseData from './modules/baseData'
import temp from './modules/temp'

const store = createStore({
  modules: {
    app,
    baseData,
    temp,
  },
})

export default store

export function installVuex(app) {
  app.use(store)
}
