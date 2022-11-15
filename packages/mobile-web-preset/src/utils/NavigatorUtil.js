/**
 * NavigatorUtil 用户环境判断
 *
 * @Author
 * @DATE    create on
 * @DESC
 */
import { isALiEnv, isMobile, isWeChatEnv, isWxMiniProgramEnv } from './common'

const ENV_TYPE = {
  // 网页端(默认)
  WEB: 'web',
  // 移动端
  MOBILE: 'mobile',
  // 支付宝
  ALI: 'ali',
  // 微信端
  WECHAT: 'wechat',
  // 微信小程序端
  MINIPROGRAM: 'miniprogram',
}

let environment = ENV_TYPE.WEB

// 检测微信小程序端
async function weChatEnvCheck() {
  try {
    let isMp = await isWxMiniProgramEnv()
    if (isMp) {
      environment = ENV_TYPE.MINIPROGRAM
    } else {
      console.log('check miniprogram environment is false')
    }
  } catch (e) {
    console.log('check environment is', environment)
  }
}

const NavigatorUtil = {
  init() {
    if (isMobile()) {
      environment = ENV_TYPE.MOBILE
      if (isWeChatEnv()) {
        environment = ENV_TYPE.WECHAT
        weChatEnvCheck()
      } else if (isALiEnv()) {
        environment = ENV_TYPE.ALI
      }
    }
    console.log('check environment is', environment)
  },
  /**
   * 获取当前环境
   * @return {string}
   */
  getEnv() {
    return environment
  },
  ENV: ENV_TYPE,
  /**
   * 网页
   * @return {boolean}
   */
  isWeb() {
    return environment === ENV_TYPE.WEB
  },
  /**
   * 手机
   * @return {boolean}
   */
  isMobile() {
    return environment === ENV_TYPE.MOBILE
  },
  /**
   * 微信
   * @return {boolean}
   */
  isWeChat() {
    return environment === ENV_TYPE.WECHAT
  },
  /**
   * 阿里小程序
   * @return {boolean}
   */
  isALi() {
    return environment === ENV_TYPE.ALI
  },
  /**
   * 同步判断是否是微信小程序
   * @return {Promise<boolean|unknown>}
   */
  async isWeChatMiniSync() {
    try {
      let isMp = await isWxMiniProgramEnv()
      isMp && (environment = ENV_TYPE.MINIPROGRAM)
      return isMp
    } catch (e) {
      return environment === ENV_TYPE.MINIPROGRAM
    }
  },
  /**
   * 微信小程序
   * @return {boolean}
   */
  isWeChatMini() {
    return environment === ENV_TYPE.MINIPROGRAM
  },
}

export default NavigatorUtil
