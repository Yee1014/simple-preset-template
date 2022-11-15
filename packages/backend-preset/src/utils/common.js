/**
 * index
 *
 * @Author
 * @DATE    create on
 * @DESC    工具类
 */
import Vue from 'vue'
import dayjs from 'dayjs'
import { Message } from 'element-ui'
import TWEEN from '@tweenjs/tween.js'
import router from '@/plugins/router'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function isPhoneNumber (value) {
  if (!value) return false
  return value.match(/^1\d{10}$/)
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function setLocal (key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function getLocal (key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export function setSession (key, value) {
  return sessionStorage.setItem(key, JSON.stringify(value))
}

export function getSession (key) {
  const data = sessionStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export function removeSession (key) {
  return sessionStorage.removeItem(key)
}

export function insertStr (source, start, newStr) {
  return source.slice(0, start) + newStr + source.slice(start)
}

/**
 * 判断是否在 时间范围内 （默认2个月）
 * @param {String} start
 * @param {String} end
 * @param {Number}  range
 * @return {Boolean}
 */
export function validDateRangeByMonth (start, end, range = 2) {
  if (!start || !end) {
    Message.warning(`请选择时间范围`)
    return false
  }
  const v1 = dayjs(start).get('month')
  const v2 = dayjs(end).get('month')
  let diff = v2 - v1
  if (diff < 0) {
    diff += 12
  }
  const result = diff >= range
  if (result) {
    Message.warning(`时间范围不能超过${range}个月`)
  }
  return !result
}

/**
 * 全角转半角
 *
 * @export
 * @param {string} str 元数据
 * @returns {string} 半角的数据
 */
export function ValueToCDB (str) {
  let result = ''
  let len = str.length
  for (let i = 0; i < len; i++) {
    let cCode = str.charCodeAt(i)
    // 全角与半角相差（除空格外）：65248（十进制）
    cCode = cCode >= 0xff01 && cCode <= 0xff5e ? cCode - 65248 : cCode
    // 处理空格
    cCode = cCode === 0x03000 ? 0x0020 : cCode
    result += String.fromCharCode(cCode)
  }
  return result
}

/**
 * 小写转大写
 *
 * @export
 * @param {string|number} value 元数据
 * @returns {string} 大写的数据
 */
export function ValueToUpper (value) {
  return `${value}`.toUpperCase()
}

/**
 * 判断响应是否成功
 *
 * @export
 * @param {object} result 响应的数据
 * @param {any} msg 提示信息
 * @returns 成功与否
 */
export function isSuccess (result, msg) {
  if (!result) return false
  let ver = result.message === '保存成功' || result.code === 200
  if (msg) {
    ver ? Message.success(msg + '成功!') : Message.error(msg + '失败!')
  }
  return ver
}

/**
 * 动画执行
 * @param startValue
 * @param endValue
 * @param parent
 * @param duration
 */
export function tweenAnimation (startValue, endValue, parent = window, duration = 500) {
  function animate () {
    if (TWEEN.update()) {
      requestAnimationFrame(animate)
    }
  }

  new TWEEN.Tween({ value: startValue })
    .to({ value: endValue }, duration)
    .onUpdate((e) => {
      if (parent === window) {
        parent.scrollTo(0, e.value.toFixed(0))
      } else {
        parent.scrollTop = e.value.toFixed(0)
      }
    })
    .start()

  animate()
}

/**
 * 错误定位到el-form表单位置
 * @param className
 */
export function scrollToErrorView (className = '.is-error') {
  Vue.nextTick(() => {
    const el = document.querySelector(className)
    if (!el) {
      return
    }
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    const top = el.getBoundingClientRect().top - 120
    if (top >= 0 && top <= 10) {
      return
    }
    tweenAnimation(scrollTop, scrollTop + top)
  })
}

/**
 * 判断是否在 时间范围内 （默认60天）
 * @param {String} start
 * @param {String} end
 * @param {Number}  range
 * @return {Boolean}
 */
export function validDateRangeByDay (start, end, range = 60) {
  if (!start || !end) {
    Message.warning(`请选择时间范围`)
    return false
  }
  const v1 = dayjs(start)
  const v2 = dayjs(end)
  const days = v2.diff(v1, 'day')
  const result = days < range
  if (!result) {
    Message.warning(`时间范围不能超过${range}天`)
  }
  return result
}

/**
 * 根据format格式化
 * @param date
 * @param format
 * @return {string}
 */
export function formatDate (date, format) {
  if (!date) return ''
  let now = dayjs(date)
  if (!now.isValid()) return ''
  switch (format) {
    case 'YMD':
      return now.format('YYYY-MM-DD')
    case 'MD':
      return now.format('MM-DD')
    case 'hms':
      return now.format('HH:mm:ss')
    case 'hm':
      return now.format('HH:mm')
    case 'MDhm':
      return now.format('MM-DD HH:mm')
    case 'YMDhm':
      return now.format('YYYY-MM-DD HH:mm')
    default:
      if (format) return now.format(format)
      return now.format('YYYY-MM-DD HH:mm:ss')
  }
}

/**
 * 跳转到登陆
 */
export function jumpLoginWeb () {
  if (process.env.NODE_ENV === 'development') {
    return Message.error('跳转到登录提示')
  }
  window.location.replace(process.env.VUE_APP_BACK_WEB + '/login?redirect_url=' + encodeURI(window.location.href))
}

/**
 * 跳转到管理后台主入口
 */
export function jumpMainWebEntry () {
  if (process.env.NODE_ENV === 'development') {
    return Message.error('跳转到管理后台入口提示')
  }
  window.location.replace(process.env.VUE_APP_BACK_WEB)
}

/**
 * 生成query参数
 * @param obj
 * @return {string}
 */
export function createQueryStr (obj) {
  let str = ''
  if (obj && obj instanceof Object) {
    const keys = Object.keys(obj)
    keys.forEach((key, index) => {
      let v = Array.isArray(obj[key]) ? encodeURIComponent(JSON.stringify(obj[key])) : obj[key]
      str += `${index === 0 ? '?' : '&'}${key}=${v}`
    })
  }
  return str
}

/**
 * @description: try catch
 * @param {function} 需要执行逻辑的函数
 * @param {any} 执行函数的参数
 * @return {array} [错误,数据]
 */
export async function tryCatch () {
  let args = Array.from(arguments)
  let asyncFunc = args.shift()
  try {
    let res = await asyncFunc(...args)
    return [null, res]
  } catch (e) {
    console.log(new Error(`Code block ${asyncFunc.name}\n${e.message || '请求服务失败，请联系管理员！'}`))
    return [e, null]
  }
}

/**
 * 同步message
 * @param config
 * @return {Promise<unknown>}
 */
export function asyncMessage (config) {
  return new Promise((resolve) => {
    let defaultConfig = {
      type: 'success',
    }
    if (typeof config === 'string') {
      defaultConfig.message = config
    }
    defaultConfig.onClose = () => {
      if (config['onClose']) {
        config['onClose']()
        delete config['onClose']
      }
      resolve(true)
    }
    Object.assign(defaultConfig, config)
    Message(defaultConfig)
  })
}

/**
 * 处理ajax 全局code
 * @param error
 */
export function dealAjaxCommonCode (error) {
  const { msg, code } = error
  if (code === 200) return
  const toast = asyncMessage({
    type: 'error',
    message: msg || '请求服务未响应，请联系管理员！',
    duration: process.env.NODE_ENV === 'production' ? 500 : 1500,
  })
  if (code === 401) {
    // 未登录
    toast.then(() => {
      jumpLoginWeb()
    })
  } else {
    // 其他情况
  }
}

/**
 * trycatch 代码块
 * @param callback 执行代码
 * @param errorCallback 错误回掉
 */
export async function tryBlock (callback, errorCallback) {
  try {
    if (typeof callback === 'function') {
      await callback()
    }
  } catch (error) {
    if (typeof errorCallback === 'function') {
      errorCallback(error)
    } else {
      console.log(new Error(error))
    }
  }
}

/**
 * @description: table表格数据映射
 * @param {array} arr: 数组对象
 * @param {string} field: 字段
 * @return 中文描述
 */
export function typeChange (arr, field) {
  return arr.find(i => i.value && i.value === field)?.label
}

/**
 * 新页面打开
 * @param url
 */
export function windowOpen (url) {
  window.open(url)
}

/**
 * 处理401 或 404 返回
 */
export function return401Or401 () {
  if (window.history.length > 0) {
    router.back()
  } else {
    router.replace({ name: 'AppContact' })
  }
}
