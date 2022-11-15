import Vue from 'vue'
import store from '@/plugins/store'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AppContact from '@/components/app/AppContact'

Vue.use(Router)

// 动态路由(后期希望可以动态删改)
export const asyncRoutes = [
  {
    path: '',
    name: 'AppContact',
    component: AppContact,
  },
]

// 默认路由配置
export const constantRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    redirect: { name: 'AppContact' },
    meta: { title: '首页' },
    children: asyncRoutes,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
  },
  {
    path: '*',
    redirect: { name: '404' },
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: constantRoutes,
})

// 是否有权限信息
let hasPermission = false
/**
 * 获取权限路由信息
 * 在进入路由前判断
 * @return {Promise<void>}
 */
const getUserPermission = async () => {
  try {
    if (hasPermission) return
    await store.dispatch('user/fetchLoginUser')
    await store.dispatch('permission/fetchAsyncNavMenu')
    hasPermission = true
  } catch (e) {
    console.log(e)
  }
}

/**
 * 是否可以跳转
 * @param to
 * @return {boolean}
 */
const canRouterNext = (to) => {
  // 是否可以跳转，例如权限判断
  return store.state.permission.asyncUserRouter.includes(to.name)
}

// 全局路由进入前
router.beforeEach(async (to, from, next) => {
  await getUserPermission()
  if (canRouterNext(to)) {
    next()
  } else {
    // 没有权限跳转到401
    next({ name: '401', replace: true })
  }
})

// 全局路由后置
router.afterEach((to, from) => {
  const { title } = to.meta
  document.title = title ? `${title}-项目` : 'backend-preset'
})

export default router
