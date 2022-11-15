const { NODE_ENV } = process.env

/**
 * app
 * @author  Yee
 * @date    2021/5/8
 * @desc
 */
export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: null,
    // 用户凭证
    sessionId: '',
    // 微信openId
    openId: '',
    // 微信appId
    appId: '',
  },
  mutations: {},
  actions: {},
  getters: {},
}
