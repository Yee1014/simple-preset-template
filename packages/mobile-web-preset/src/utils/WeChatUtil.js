/**
 * WeChatUtil 微信工具类
 *
 * @Author
 * @DATE    create on
 * @DESC
 */
const CODE_MESSAGE = {
  200: 'ok',
  201: '缺少请求参数[appId]',
  202: '缺少请求参数[timeStamp]',
  203: '缺少请求参数[nonceStr]',
  204: '缺少请求参数[package]',
  205: '缺少请求参数[signType]',
  206: '缺少请求参数[paySign]',
  300: '缺少请求参数',
  350: 'cancel',
  400: 'fail',
  500: 'error',
}

const LINK_TYPE_WX = {
  to: 'navigateTo',
  back: 'navigateBack',
  switch: 'switchTab',
  reLaunch: 'reLaunch',
  redirect: 'redirectTo',
}

function callback(fn, data) {
  if (fn && typeof fn === 'function') {
    fn(data)
  }
}

// 拉起微信支付实现
function onBridgeReady(param) {
  let info = {
    code: 200,
    msg: CODE_MESSAGE['200'],
  }
  if (!param) return
  let { data, success, fail, error } = param
  if (!data) {
    info.code = 300
    info.msg = CODE_MESSAGE[info.code]
    callback(fail, info)
    callback(error, info)
    return
  }
  let { appId, timeStamp, nonceStr, signType, paySign } = data
  if (!appId) {
    info.code = 201
  } else if (!timeStamp) {
    info.code = 202
  } else if (!nonceStr) {
    info.code = 203
  } else if (data['package'] === undefined) {
    info.code = 204
  } else if (!signType) {
    info.code = 205
  } else if (!paySign) {
    info.code = 206
  }
  if (info.code !== 200) {
    info.msg = CODE_MESSAGE[info.code]
    callback(error, info)
    return
  }
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    {
      // 公众号名称，由商户传入
      appId: appId,
      // 时间戳，自1970年以来的秒数
      timeStamp: timeStamp + '',
      // 随机串
      nonceStr: nonceStr,
      package: data['package'],
      // 微信签名方式：
      signType: signType,
      // 微信签名
      paySign: paySign,
    },
    res => {
      // console.log('getBrandWCPayRequest', res)
      let { err_msg: errMsg } = res
      if (errMsg === 'get_brand_wcpay_request:ok') {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        info.code = 201
        info.msg = CODE_MESSAGE[info.code]
        callback(success, info)
      } else if (errMsg === 'get_brand_wcpay_request:fail') {
        info.code = 400
        info.msg = CODE_MESSAGE[info.code]
        callback(fail, info)
      } else if (errMsg === 'get_brand_wcpay_request:cancel') {
        info.code = 350
        info.msg = CODE_MESSAGE[info.code]
        callback(fail, info)
      } else {
        info.code = 500
        info.msg = CODE_MESSAGE[info.code]
        callback(error, info)
      }
    }
  )
}

// 拉起微信支付
function invokeJSBridge(param) {
  if (typeof WeixinJSBridge == 'undefined') {
    if (document.addEventListener) {
      document.addEventListener(
        'WeixinJSBridgeReady',
        onBridgeReady.bind(this, param),
        false
      )
    } else if (document.attachEvent) {
      document.attachEvent(
        'WeixinJSBridgeReady',
        onBridgeReady.bind(this, param)
      )
      document.attachEvent(
        'onWeixinJSBridgeReady',
        onBridgeReady.bind(this, param)
      )
    }
  } else {
    onBridgeReady(param)
  }
}

const WeChatUtil = {
  /**
   * 微信支付
   * @param param
   * {
   *   data: {appId, timeStamp, nonceStr, package, signType, paySign},
   *   success: function ()
   *   fail: function ()
   *   error: function ()
   * }
   */
  callPay(param) {
    invokeJSBridge(param)
  },
  /**
   * 微信跳转
   * @param param
   * {
   *   type: ['to', 'back', 'switch', 'reLaunch','redirect']
   *   url: '' 除了type=back 其余都要传
   * }
   */
  link(param) {
    const { type, url } = param
    const linkType = LINK_TYPE_WX[type]
    if (linkType === 'navigateBack') {
      wx.miniProgram.navigateBack()
    } else {
      wx.miniProgram[linkType]({
        url,
      })
    }
  },
}

export default WeChatUtil
