import MyApi from '@/api/modules/MyApi'

export default {
  getHostUrl() {
    return `${location.protocol}//${location.hostname}`
  },
  getOpenId(redirectUri, appId) {
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&component_appid=wx8df4061181823934&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=snsapi_base&state=bs#wechat_redirect`
  },

  getPayState({
    outTradeNo = '',
    intervalTime = 3000,
    intervalCnt = 5,
    success = () => {},
    error = () => {},
    complete = () => {},
  }) {
    let count = 0
    let timer = setInterval(() => {
      if (count >= intervalCnt) {
        clearInterval(timer)
        error({
          code: 'termination',
        })
        return
      }
      count++
      MyApi.getPayState({ outTradeNo })
        .then(({ data }) => {
          if (data === true) {
            success(data)
            clearInterval(timer)
          } else if (data === null) {
            error({
              code: 'error',
            })
            clearInterval(timer)
          }
        })
        .catch(() => {
          clearInterval(timer)
        })
    }, intervalTime)

    MyApi.getPayState({ outTradeNo })
      .then(({ data }) => {
        if (data === true) {
          success(data)
          clearInterval(timer)
        } else if (data === null) {
          error({
            code: 'error',
          })
          clearInterval(timer)
        }
      })
      .catch(() => {
        clearInterval(timer)
      })
  },
}
