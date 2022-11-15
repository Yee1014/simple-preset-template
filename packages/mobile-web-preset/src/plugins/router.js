import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import { tI18n } from '@/plugins/i18n'
import Page from '@/views/Page'
import { isLogin } from '@/utils'
import store from '@/plugins/store'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { behavior: 'smooth', x: 0, y: 0 }
  },
  routes: [
    // 存放需要keep-alive的页面组件
    {
      path: '/',
      name: 'Home',
      meta: { title: '', auth: false },
      component: Home,
      children: [],
    },
    {
      path: '/page',
      name: 'Page',
      component: Page,
      children: [],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      // redirect: { name: 'Page404' },
      meta: { title: '404', auth: false },
      component: () =>
        import(/* webpackChunkName: "Page404" */ '@/views/404.vue'),
    },
  ],
})

/**
 * 设置多语言
 */
/*async function setLocaleLanguage() {
  const lang = localStorage.getItem(APP_VAR.LOCAL_STORAGE_LANG_KEY) || 'zh-CN'
  await loadLanguageAsync(lang)
}*/

/**
 * 设置网页title
 * @param to
 */
async function setHtmlTitle(to) {
  const meta = to.meta
  const title = await store.dispatch('baseData/getCbcModuleTitle', {
    routeName: to.name,
    code: to.params?.code,
  })
  document.title = title || tI18n(meta ? `router.${to.name}` : 'router.Home')
}

/**
 * 判断是否需要验证权限
 * @param to
 * @param next
 */
function checkAuth(to, next) {
  // 需要是否登录
  const auth = to.meta['auth'] || to.meta['auth'] === undefined
  if (auth && !isLogin(false)) {
    next({ name: 'SignIn', replace: true })
  } else {
    next()
  }
}

/**
 * 判断店铺是否过期
 * @param to
 * @param next
 */
// function checkExpire(to, next) {
//   const isExpire = store.state.app.siteInfo?.shopBean?.isExpire
//   if (isExpire && to.name !== 'Maintain') {
//     next({ name: 'Maintain', replace: true })
//   } else {
//     next()
//   }
// }

/**
 * 判断某个功能是否开启
 * @param to
 * @param next
 */
/*function checkFeatureOpened(to, next) {
  if (
    store.getters['baseData/siteSetting'].billConfirmationMethod === 0 &&
    to.name === 'PendingPay'
  ) {
    // 无需确认账单确认方式， 无法访问待支付
    next({ name: 'Home', replace: true })
  }
}*/

router.beforeEach(async (to, from, next) => {
  try {
    // checkExpire(to, next)
    // await setLocaleLanguage()
    setHtmlTitle(to)
    // 需要是否登录
    checkAuth(to, next)
  } catch (e) {
    console.log(e)
    checkAuth(to, next)
  }
})

export default router

export function installRouter(app) {
  app.use(router)
}
