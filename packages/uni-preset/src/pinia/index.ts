/**
 * index
 * @author  Yee
 * @date    2022/10/24
 * @desc    pinia状态管理
 */
import { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

export function setupPinia (app: App) {
  app.use(pinia)
}