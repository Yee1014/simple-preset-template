/**
 * Toast
 * @author  Yee
 * @date    2021/5/12
 * @desc    全局toast
 */

import { Notify, Toast } from 'vant'

/**
 * 提示吐司
 * @param {String|Object} option
 * @return {VanToast}
 */
export function showToast(option = '') {
  const defaultMessage = {
    duration: 1500, // 持续展示 toast
    forbidClick: true,
    message: '',
  }
  if (typeof option === 'string') {
    defaultMessage.message = option
  } else {
    Object.assign(defaultMessage, option)
  }
  return Toast(defaultMessage)
}

/**
 * 清除全部toast
 * 如果动态更新之后，建议使用
 */
export function clearAllToast() {
  Toast.clear(true)
}

/**
 * 提示bar
 * @param {String|Object} option
 * @param {string} option.type
 * @param {string} option.message
 * @param {number|string} option.duration
 * @return {function} 关闭函数
 */
export function showNotify(option) {
  return Notify(option).clear
}
