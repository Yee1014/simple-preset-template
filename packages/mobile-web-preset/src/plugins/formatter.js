/**
 * formatter
 * @author  Yee
 * @date    2022/3/23
 * @desc    vue全局global属性扩展
 */

import { toNumber } from '@/utils/common'

export function installFormatters(app) {
  app.config.globalProperties.$formatter = Object.freeze({
    // 数值显示格式 --对0值的特殊处理
    number: (value, precision) => {
      value = toNumber(value)
      if (typeof value !== 'number' || value !== value) {
        // 非数值 或 NaN
        return value || '-'
      }
      if (typeof precision === 'number' && precision >= 0) {
        // 指定小数位
        return value.toFixed(precision)
      }
      return value
    },
  })
}
