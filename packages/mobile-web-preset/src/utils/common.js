/**
 * common
 * @author  Yee
 * @date    2021/5/8
 * @desc    获取公用信息函数
 */
import copy from 'copy-to-clipboard'
import qs from 'qs'
import curry from 'lodash/curry'
import dayjs from 'dayjs'
import jsbarcode from 'jsbarcode'
import { tI18n } from '@/plugins/i18n'
import { showToast } from '@/components/common/Toast'

// 获取cdn 地址
export function getCDNUrl(name) {
  return ''
}

// 复制
export function copyData(data) {
  copy(data)
  showToast({ message: tI18n('message.copySuccess') })
}

export const toNumber = val => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export const ratioNumber = curry((isMultiply, ratio, value) => {
  value = toNumber(value)
  if (typeof value !== 'number' || value !== value) {
    return 0
  }
  return isMultiply ? value * ratio : value / ratio
})

/**
 * 转换成前端金额
 * @param value
 * @return {*}
 */
export const toFrontMoney = ratioNumber(false, 100)

/**
 * 转换成后端金额
 * @param value
 * @return {*}
 */
export const toBackMoney = ratioNumber(true, 100)

// 重量处理 --前端转后端 n*1000
export const toBackendWeight = ratioNumber(true, 1000)

// 重量处理 --后端转前端 n/1000
export const toFrontendWeight = ratioNumber(false, 1000)

// 系数/比率处理 --前端转后端 n*10000
export const toBackendRatio = ratioNumber(true, 10000)

// 系数/比率处理 --后端转前端 n/10000
export const toFrontendRatio = ratioNumber(false, 10000)

/**
 * 获取search参数对应key的值
 * @param key
 * @return {string}
 */
export function getUrlKey(key) {
  let search = window.location.search
  if (search) {
    search = search.replace('?', '')
    const map = qs.parse(search)
    return map[key]
  } else {
    return ''
  }
}

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function isPhoneNumber(value) {
  if (!value) return false
  return value.match(/^1\d{10}$/)
}

export function isCarNumber(value) {
  if (!value) return false
  let reg = new RegExp(
    '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$'
  )
  return reg.exec(value)
}

/**
 * 是否是移动端
 * @return {boolean}
 */
export function isMobile() {
  return (
    navigator.userAgent
      .toLowerCase()
      .match(
        /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
      ) != null
  )
}

/**
 * 是否是微信端
 * @return {boolean}
 */
export function isWeChatEnv() {
  let ua = navigator.userAgent.toLowerCase()
  return !!(
    ua.match(/MicroMessenger/i) &&
    (ua.match(/Android/i) || ua.match(/iPhone/i))
  )
}

/**
 * 是否是支付宝端
 * @return {boolean}
 */
export function isALiEnv() {
  let ua = navigator.userAgent.toLowerCase()
  return !!(
    ua.match(/Alipay/i) &&
    (ua.match(/Android/i) || ua.match(/iPhone/i))
  )
}

/**
 * 是否是微信小程序端
 * @return {boolean}
 */
export function isMiniProgramEnv() {
  return window.__wxjs_environment === 'miniprogram'
}

/**
 * 是否是微信小程序端 异步
 * @return {Promise<unknown>}
 */
export function isWxMiniProgramEnv() {
  return new Promise((resolve, reject) => {
    if (isMiniProgramEnv()) {
      resolve(true)
    } else {
      let timer = setTimeout(() => {
        resolve(false)
      }, 3000)
      wx.miniProgram.getEnv(res => {
        clearTimeout(timer)
        resolve(res.miniprogram)
      })
    }
  })
}

export function isAndroid() {
  return window.navigator.userAgent.indexOf('Android') > -1
}

export function isIos() {
  return isIPad() || isIPhone()
}

export function isIPhone() {
  return window.navigator.userAgent.indexOf('iPhone') > -1
}

export function isIPad() {
  return window.navigator.userAgent.indexOf('iPad') > -1
}

export function getUrlParam(name) {
  let after = window.location.hash.split('?')[1]
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  if (after) {
    let r = after.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  } else {
    let t = window.location.search.substr(1).match(reg)
    if (t != null) return decodeURIComponent(t[2])
    return null
  }
}

// 时间格式化
export function datetimeFormat(value, format = 'YYYY-MM-DD HH:mm') {
  if (!value) return ''
  return dayjs(value).format(format)
}

export function formatTime(date) {
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

export function getSession(key) {
  return window.sessionStorage.getItem(key)
}

export function setSession(key, value) {
  return window.sessionStorage.setItem(key, value)
}

// 生成条形码图片DataURL
export const generateBarcodeImageDataURL = (value, options) => {
  try {
    const img = document.createElement('img')
    jsbarcode(
      img,
      value,
      Object.assign(
        {
          // width: 2,
          // height: 50,
          margin: 0,
          marginBottom: 6,
          font:
            'PingFang SC, Lantinghei SC, Microsoft YaHei, HanHei SC, Helvetica Neue, Open Sans, Arial, Hiragino Sans GB, "微软雅黑", STHeiti, WenQuanYi Micro Hei, SimSun, sans-serif',
          fontSize: 16,
          fontOptions: 'bold',
          background: 'rgba(255, 255, 255, 0)',
        },
        options
      )
    )
    return img.src
  } catch (err) {
    return ''
  }
}
// 生成条形码图片SVG
export const generateBarcodeSvg = (value, options) => {
  try {
    const img = document.createElement('svg')
    const div = document.createElement('div')
    div.appendChild(img)
    jsbarcode(
      img,
      value,
      Object.assign(
        {
          // width: 2,
          height: 50,
          margin: 0,
          marginBottom: 6,
          font:
            'PingFang SC, Lantinghei SC, Microsoft YaHei, HanHei SC, Helvetica Neue, Open Sans, Arial, Hiragino Sans GB, "微软雅黑", STHeiti, WenQuanYi Micro Hei, SimSun, sans-serif',
          fontSize: 16,
          fontOptions: 'bold',
          background: 'rgba(255, 255, 255, 0)',
        },
        options
      )
    )
    return div.innerHTML
  } catch (err) {
    return ''
  }
}
