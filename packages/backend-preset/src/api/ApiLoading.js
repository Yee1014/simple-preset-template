/**
 * ApiLoading
 * @author  Yee
 * @date    2021/1/14
 * @desc
 */

import { Loading } from 'element-ui'

// 加载器loading
let loadingInstance
// 等待的数量
let loadingCount = 0

/**
 * 显示加载
 * @param {string} text 加载中的文字
 */
export function showLoading (text = '加载中...') {
  loadingCount++
  if (!loadingInstance) {
    loadingInstance = Loading.service({
      lock: true,
      text,
      // background: 'rgba(0, 0, 0, 0.55)',
    })
  }
}

/**
 * 清除loading示例
 */
function clearLoading () {
  setTimeout(() => {
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
    loadingCount = 0
  }, 0)
}

/**
 * 关闭加载
 * @param {boolean} manual 是否手动关闭
 */
export function closeLoading (manual = false) {
  if (manual) {
    clearLoading()
  }
  loadingCount--
  if (loadingCount <= 0) {
    clearLoading()
  }
}
