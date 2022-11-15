/**
 * directive
 * @author  Yee
 * @date    2021/6/7
 * @desc
 */
import { ratioNumber } from '@/utils/common'

export function installDirective(app) {
  // 金额转换成元
  app.directive('money', {
    updated(el, binding) {
      // el.innerHTML = ratioNumber(false, 100)(el.innerHTML)
    },
  })
}
