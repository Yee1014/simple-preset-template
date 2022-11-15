/**
 * TencentCaptcha
 * @author  Yee
 * @date    2021/5/8
 * @desc    腾讯云验证码
 * @link    https://cloud.tencent.com/document/product/1110/36841
 */

/**
 * 获取腾讯云验证码
 * @param customParams 自定义参数
 * @return {Promise<unknown>}
 */
export function generateTencentCode(customParams = '') {
  return new Promise((resolve, reject) => {
    // show 显示验证码
    // destroy 隐藏验证码
    // getTicket 获取验证码验证成功后的 ticket; 返回 {"appid":"","ticket":""}
    const captcha = new TencentCaptcha(
      /* appid (暂用：2078887334) */
      '2078887334',
      function(res) {
        /*
         * callback
         * {Number}   ret       0：验证成功。2：用户主动关闭验证码。
         * {String}   ticket    验证成功的票据，当且仅当 ret = 0 时 ticket 有值。
         * {String}   appid     场景 ID。
         * {any}      bizState  自定义透传参数。
         * {String}   randstr   本次验证的随机串，请求后台接口时需带上。
         */
        if (res.ret === 0) {
          resolve(res)
        } else {
          reject(res)
        }
        captcha.destroy()
      },
      {
        bizState: customParams,
        needFeedBack: false,
      }
    )
    captcha.show()
  })
}
