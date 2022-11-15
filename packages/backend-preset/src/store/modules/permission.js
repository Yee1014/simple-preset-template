/**
 * permission
 * @author  Yee
 * @date    2020/12/10
 * @desc    权限状态管理(路由)
 */
import { asyncRoutes } from '@/plugins/router'
import { fetchUserMenu } from '@/api/module/app'
// import api from '@/util/api'

const state = {
  // 动态导航菜单
  asyncNavMenu: [],
  // 当前角色可访问的路由(Home，401等是默认页面必须存在)
  asyncUserRouter: ['Dashboard', 'AppContact', 'About', '404', '401'],
}

const mutations = {
  /**
   * 设置路由数据
   * @param state
   * @param data
   */
  SET_NAV_MENU: (state, data) => {
    state.asyncNavMenu = data
  },
  /**
   * 设置当前角色的可访问视图
   * @param state
   * @param data
   */
  SET_USER_ROUTER: (state, data) => {
    state.asyncUserRouter = state.asyncUserRouter.concat(data)
  },
}

/**
 * 是否有菜单权限
 * @param {array} remoteMenu  远程权限数据
 * @param {object} router    当前菜单
 * @return {*}
 */
const hasMenuPermission = (remoteMenu, router) => {
  return remoteMenu.some(menu => menu.flag === router.name)
}

/**
 * 生成差异的导航菜单
 * @param {array} routers 本地路由集合
 * @param {array} remoteMenu 远程控制的菜单
 * @return {[]}
 */
const createAsyncMenu = (routers, remoteMenu) => {
  const navMenu = []
  routers.forEach(router => {
    const menu = { ...router }
    // 是否有权限
    if (hasMenuPermission(remoteMenu, menu)) {
      // 对应的权限菜单
      const matchMenu = remoteMenu.find(rm => rm.flag === router.name)
      Object.assign(menu, matchMenu)
      // 是否有子路由
      const hasSubMenu = router.children
      if (hasSubMenu) {
        // 找到对应父远程菜单数据,并创建子菜单
        const subMenu = remoteMenu.find(subRemoteMenu => subRemoteMenu.flag === router.name)
        menu.children = createAsyncMenu(router.children, subMenu.children)
      }
      navMenu.push(menu)
    }
  })
  return navMenu
}

// 本地开发菜单栏
const DevelopmentNavMenu = {
  code: 200,
  data: [],
}

const actions = {
  /**
   * 获取动态路由
   * @param e
   * @return {Promise<void>}
   */
  async fetchAsyncNavMenu (e) {
    const res = process.env.NODE_ENV === 'development'
      ? DevelopmentNavMenu
      : await fetchUserMenu()
    if (res.code === 200) {
      console.log('权限路由信息：', res)
      // 如果有首页，删除首页不在menu中
      const homeIndex = res.data.findIndex(d => d.href === '/')
      if (homeIndex !== -1) {
        res.data.splice(homeIndex, 1)
      }
      // 导航菜单
      const navMenu = createAsyncMenu(asyncRoutes, res.data)
      e.commit('SET_NAV_MENU', navMenu)
    }
  },
}

const getters = {
  // 获取动态导航菜单数据
  asyncNavMenu: state => state.asyncNavMenu,
  // 当前角色可访问的路由
  asyncUserRouter: state => state.asyncUserRouter,
}

export default {
  namespaced: true,
  mutations,
  actions,
  getters,
  state,
}
