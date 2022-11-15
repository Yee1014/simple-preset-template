/**
 * user
 * @author  Yee
 * @date    2020/12/10
 * @desc    登录用户信息
 */
import { fetchLoginUser } from '@/api/module/app'

// 本地发开测试人员
const DevelopmentLoginUser = {
  code: 200,
  data: {
    userName: '本地开发人员',
    userId: '0000',
    roles: ['admin'],
    permissions: [],
  },
}

export default {
  namespaced: true,
  state: {
    // 登录用户
    loginUser: null,
  },
  mutations: {
    SET_LOGIN_USER: (state, data) => {
      state.loginUser = data
    },
  },
  actions: {
    /**
     * 获取登录用户信息
     * @param commit
     * @param data 可能是token值
     * @return {Promise<void>}
     */
    async fetchLoginUser ({ commit }, data) {
      const res = process.env.NODE_ENV === 'development'
        ? DevelopmentLoginUser
        : await fetchLoginUser()
      if (res.code === 200) {
        console.log('权限角色信息：', res)
        commit('permission/SET_USER_ROUTER', res.data.permissions, { root: true })
        delete res.data.permissions
        commit('SET_LOGIN_USER', res.data)
      }
    },
  },
  getters: {
    loginUser: state => state.loginUser,
    // 角色等级
    userRole: state => state.loginUser?.roles || [],
    // 是否是管理员
    isAdminUser: state => {
      if (!state.loginUser) {
        return false
      }
      // 管理的角色数值
      return state.loginUser.roles.includes('')
    },
  },
}
