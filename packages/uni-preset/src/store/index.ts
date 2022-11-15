/**
 * index
 * @author  Yee
 * @date    2022/10/24
 * @desc    状态管理
 */

import { App } from 'vue'
import { createStore } from 'vuex'

const store = createStore({})

export function setupStore(app: App) {
  app.use(store)
}
