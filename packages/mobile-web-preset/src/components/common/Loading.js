/**
 * Loading
 * @author  Yee
 * @date    2021/1/14
 * @desc    全局loading
 */

import { Toast } from 'vant'
import { tI18n } from '@/plugins/i18n'

// 加载器loading
let loadingInstance
// 等待的数量
let loadingCount = 0

/**
 * 显示加载
 * @param {string} text 加载中的文字
 */
export function showLoading(text = tI18n('message.loadingText')) {
  loadingCount++
  if (!loadingInstance) {
    loadingInstance = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: text,
    })
  }
}

/**
 * 清除loading示例
 */
function clearLoading() {
  if (loadingInstance) {
    loadingInstance.clear()
    loadingInstance = null
  }
  loadingCount = 0
}

/**
 * 关闭加载
 * @param {boolean} manual 是否手动关闭
 */
export function closeLoading(manual = false) {
  if (manual) {
    clearLoading()
  }
  loadingCount--
  if (loadingCount <= 0) {
    clearLoading()
  }
}
