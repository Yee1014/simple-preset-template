/**
 * RuleUtil
 * @author  Yee
 * @date    2021/5/18
 * @desc    校验工具
 */
import { tI18n } from '@/plugins/i18n'

export default {
  /**
   * 必填
   * @param message
   * @param trigger
   * @return {{trigger: string[], message: string, required: boolean}}
   */
  isRequired(message = '', trigger = ['blur']) {
    return {
      required: true,
      message,
      trigger,
    }
  },
  /**
   * 必填
   * @param message
   * @param trigger
   * @return {{trigger: string[], required: boolean}}
   */
  isRequiredValid(message = '', trigger = ['blur']) {
    return {
      required: true,
      trigger,
      validator: (rule, value, callback) => {
        if (value === '' || value === null || value === undefined) {
          callback(message)
        } else {
          callback()
        }
      },
    }
  },
  /**
   * 手机号
   * @return {boolean|{validator(*=): boolean, pattern: RegExp, trigger: string[], message: (TranslateResult|string)}}
   */
  isPhone() {
    return {
      validator(val) {
        return /^[1]\d{10}$/.test(val)
      },
      pattern: /^[1]\d{10}$/,
      message: tI18n('formRule.phone'),
      trigger: ['onSubmit'],
    }
  },
  /**
   * 长度
   * @param min
   * @param max
   * @param message
   * @return {{validator(*=): boolean, trigger: string[], message}|boolean}
   */
  isLength(min, max, message) {
    return {
      validator(val) {
        // const start = 'u4e00'
        // const end = 'u9fa5'
        // return new RegExp('^[\\' + start + '-\\' + end + ']{' + min + ',' + max + '}$').test(val)
        return new RegExp('^[\\w\\W]{' + min + ',' + max + '}$').test(val)
      },
      message,
      trigger: ['onSubmit'],
    }
  },
  /**
   * 是否是邮箱
   * @return {{pattern: RegExp, trigger: string[], message: string}}
   */
  isEmail() {
    return {
      pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      message: tI18n('formRule.email'),
      trigger: ['onSubmit'],
    }
  },
  /**
   * 正整数
   * @return {{pattern: RegExp, trigger: string[], message: string}}
   */
  isNumber() {
    return {
      pattern: /^[0-9]+$/,
      message: tI18n('formRule.number'),
      trigger: ['onSubmit'],
    }
  },
  /**
   * 数值范围0.01～999999.99
   * @return {{pattern: RegExp, trigger: string[], message: string}}
   */
  isFloat2Number6() {
    return {
      pattern: /^([0-9]{1,6})(\.[0-9]{1,2})?$/,
      message: tI18n('formRule.float2Number6'),
      trigger: ['onSubmit'],
    }
  },
  /**
   * 数值范围0.01～99999999.99
   * @return {{pattern: RegExp, trigger: string[], message: string}}
   */
  isFloat2Number8() {
    return {
      pattern: /^([0-9]{1,8})(\.[0-9]{1,2})?$/,
      message: tI18n('formRule.float2Number8'),
      trigger: ['onSubmit'],
    }
  },
  /**
   * 数值范围0.01～99999.99
   * @return {{pattern: RegExp, trigger: string[], message: string}}
   */
  isFloat2Number5() {
    return {
      pattern: /^([0-9]{1,5})(\.[0-9]{1,2})?$/,
      message: tI18n('formRule.float2Number5'),
      trigger: ['onSubmit'],
    }
  },
  /**
   * 账户校验规则
   * @return {boolean|{validator(*=): *, trigger: string[], message: (TranslateResult|string)}}
   */
  isAccountNumber() {
    return {
      validator(val) {
        return val && val.length > 3 && val.length < 31
      },
      message: tI18n('formRule.account'),
      trigger: ['onSubmit'],
    }
  },
  /**
   * 是否是后台账户
   * @return {{pattern: RegExp, trigger: string[], message: (TranslateResult|string)}}
   */
  isBackAccount() {
    return {
      pattern: /^[0-9A-Za-z]{8,30}$/,
      message: tI18n('formRule.backAccount'),
      trigger: ['onSubmit'],
    }
  },
}
