/**
 * ruleCommon
 * @author  Yee
 * @date    2020/12/15
 * @desc    公用校验规则
 */

/**
 * 必填
 * @param msg
 * @return {{trigger: [string, string], message: string, required: boolean}}
 */
export function isRequired (msg = '') {
  return { required: true, message: `${msg}必填`, trigger: ['blur', 'change'] }
}
