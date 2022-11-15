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
      children: [
        {
          path: 'cbc',
          name: 'CBCHome',
          meta: { title: '跨境集运', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "CBCHome" */ '@/views/Home/CBCHome.vue'
            ),
        },
        {
          path: 'freight',
          name: 'Freight',
          meta: { title: '运费试算', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "Freight" */ '@/views/CBConsolidation/CalcFreight/CalcFreight.vue'
            ),
        },
        {
          path: 'case/detail',
          name: 'CaseDetail',
          meta: { title: '案例详情', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "CustomHome" */ '@/views/Home/caseDetail.vue'
            ),
        },
        {
          path: 'web',
          name: 'CustomHome',
          meta: { title: '公司介绍', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "CustomHome" */ '@/views/Home/CustomHome.vue'
            ),
        },
        {
          path: 'my',
          name: 'MyHome',
          meta: { title: '我的', auth: true },
          component: () =>
            import(/* webpackChunkName: "MyHome" */ '@/views/Home/MyHome.vue'),
        },
        {
          path: 'sheet-forecast/:code',
          name: 'SheetForecast',
          meta: { title: '', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "SheetForecast" */ '@/views/CBConsolidation/SheetForecast.vue'
            ),
        },
        {
          path: 'create-order',
          name: 'OrderCreate',
          meta: { title: '订单创建', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "OrderCreate" */ '@/views/CBConsolidation/OrderCreate.vue'
            ),
        },
        {
          path: 'not-stored-sheet-detail/:code',
          name: 'NotStoredSheetDetail',
          meta: { title: '未入库-预报单详情', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "NotStoredSheetDetail" */ '@/views/My/NotStored/NotStoredSheetDetail.vue'
            ),
        },
        {
          path: 'has-stored-sheet-detail/:code',
          name: 'HasStoredSheetDetail',
          meta: { title: '已入库-预报单详情', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "HasStoredSheetDetail" */ '@/views/My/HasStored/HasStoredSheetDetail.vue'
            ),
        },
        {
          path: 'pending-review-detail/:code',
          name: 'PendingReviewDetail',
          meta: { title: '待审核-订单详情', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "PendingReviewDetail" */ '@/views/My/PendingReview/PendingReviewDetail.vue'
            ),
        },
        {
          path: 'pending-pay-detail/:code',
          name: 'PendingPayDetail',
          meta: { title: '待支付-订单详情', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "PendingPayDetail" */ '@/views/My/PendingPay/PendingPayDetail.vue'
            ),
        },
        {
          path: 'not-transported-detail/:code',
          name: 'NotTransportedDetail',
          meta: { title: '待出运-订单详情', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "NotTransportedDetail" */ '@/views/My/NotTransported/NotTransportedDetail.vue'
            ),
        },
        {
          path: 'apply-transport',
          name: 'ApplyTransport',
          meta: { title: '申请出运', auth: true },
          component: () =>
            import(
              /* webpackChunkName: "ApplyTransport" */ '@/views/My/HasStored/ApplyTransport.vue'
            ),
        },
        {
          path: 'has-transported-detail/:code',
          name: 'HasTransportedDetail',
          meta: { title: '已出运-订单详情' },
          component: () =>
            import(
              /* webpackChunkName: "HasTransportedDetail" */ '@/views/My/HasTransported/HasTransportedDetail.vue'
            ),
        },
        {
          path: 'has-received-detail/:code',
          name: 'HasReceivedDetail',
          meta: { title: '已签收-订单详情' },
          component: () =>
            import(
              /* webpackChunkName: "HasReceivedDetail" */ '@/views/My/HasReceived/HasReceivedDetail.vue'
            ),
        },
        {
          path: 'inform-setting',
          name: 'InformSetting',
          meta: { title: '推送设置' },
          component: () =>
            import(
              /* webpackChunkName: "InformSetting" */ '@/views/My/InformSetting/index.vue'
            ),
        },
        {
          path: 'redirect-page',
          name: 'RedirectPage',
          meta: { title: '页面跳转中', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "RedirectPage" */ '@/views/My/Redirect/page.vue'
            ),
        },
        {
          path: 'order-empty',
          name: 'OrderEmpty',
          meta: { title: '订单不存在', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "OrderEmpty" */ '@/views/My/Redirect/empty.vue'
            ),
        },
      ],
    },
    {
      path: '/page',
      name: 'Page',
      component: Page,
      children: [
        {
          path: 'calc-freight',
          name: 'CalcFreight',
          meta: { title: '运费试算', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "CalcFreight" */ '@/views/CBConsolidation/CalcFreight/CalcFreight.vue'
            ),
        },
        {
          path: 'destination-search',
          name: 'DestinationSearch',
          meta: { title: '选择目的地', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "DestinationSearch" */ '@/views/CBConsolidation/CalcFreight/DestinationSearch.vue'
            ),
        },
        {
          path: 'freight-list',
          name: 'FreightList',
          meta: { title: '试算结果', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "FreightList" */ '@/views/CBConsolidation/CalcFreight/FreightList.vue'
            ),
        },
        {
          path: 'freight-detail',
          name: 'FreightDetail',
          meta: { title: '报价详情', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "FreightDetail" */ '@/views/CBConsolidation/CalcFreight/FreightDetail.vue'
            ),
        },
        {
          path: 'freight-rule',
          name: 'FreightRule',
          meta: { title: '运费规则' },
          component: () =>
            import(
              /* webpackChunkName: "FreightRule" */ '@/views/CBConsolidation/CalcFreight/FreightRule.vue'
            ),
        },
        {
          path: 'wareHouse',
          name: 'WareHouseList',
          meta: { title: '仓库地址' },
          component: () =>
            import(
              /* webpackChunkName: "WareHouseList" */ '@/views/CBConsolidation/WareHouseList.vue'
            ),
        },
        {
          path: 'order-query',
          name: 'OrderQuery',
          meta: { title: '订单查询', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "OrderQuery" */ '@/views/CBConsolidation/OrderQuery/OrderQuery.vue'
            ),
        },
        {
          path: 'order-query-detail',
          name: 'OrderQueryDetail',
          meta: { title: '预报单详情', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "OrderQueryDetail" */ '@/views/CBConsolidation/OrderQuery/OrderQueryDetail.vue'
            ),
        },
        {
          path: 'notice-detail',
          name: 'NoticeDetail',
          meta: { title: '业务公告', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "NoticeDetail" */ '@/views/CBConsolidation/NoticeDetail.vue'
            ),
        },
        {
          path: 'pending-pay',
          name: 'PendingPay',
          meta: { title: '待支付' },
          component: () =>
            import(
              /* webpackChunkName: "PendingPay" */ '@/views/My/PendingPay/PendingPay.vue'
            ),
        },
        {
          path: 'pending-review',
          name: 'PendingReview',
          meta: { title: '待审核' },
          component: () =>
            import(
              /* webpackChunkName: "PendingReview" */ '@/views/My/PendingReview/PendingReview.vue'
            ),
        },
        {
          path: 'not-stored',
          name: 'NotStored',
          meta: { title: '未入库' },
          component: () =>
            import(
              /* webpackChunkName: "NotStored" */ '@/views/My/NotStored/NotStored.vue'
            ),
        },
        {
          path: 'has-stored',
          name: 'HasStored',
          meta: { title: '已入库' },
          component: () =>
            import(
              /* webpackChunkName: "HasStored" */ '@/views/My/HasStored/HasStored.vue'
            ),
        },
        {
          path: 'not-transported',
          name: 'NotTransported',
          meta: { title: '待出运' },
          component: () =>
            import(
              /* webpackChunkName: "NotTransported" */ '@/views/My/NotTransported/NotTransported.vue'
            ),
        },
        {
          path: 'has-transported',
          name: 'HasTransported',
          meta: { title: '已出运' },
          component: () =>
            import(
              /* webpackChunkName: "HasTransported" */ '@/views/My/HasTransported/HasTransported.vue'
            ),
        },
        {
          path: 'has-received',
          name: 'HasReceived',
          meta: { title: '已签收' },
          component: () =>
            import(
              /* webpackChunkName: "HasReceived" */ '@/views/My/HasReceived/HasReceived.vue'
            ),
        },
        {
          path: 'express-detail',
          name: 'ExpressDetail',
          meta: { title: '第三方物流', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "ExpressDetail" */ '@/views/Data/ExpressDetail.vue'
            ),
        },
        {
          path: 'receiver-list',
          name: 'ReceiverList',
          meta: { title: '常用收件信息' },
          component: () =>
            import(
              /* webpackChunkName: "ReceiverList" */ '@/views/Data/ReceiverList.vue'
            ),
        },
        {
          path: 'sender-list',
          name: 'SenderList',
          meta: { title: '常用寄件信息' },
          component: () =>
            import(
              /* webpackChunkName: "SenderList" */ '@/views/Data/SenderList.vue'
            ),
        },
        {
          path: 'notifier-list',
          name: 'NotifierList',
          meta: { title: '常用通知人信息' },
          component: () =>
            import(
              /* webpackChunkName: "NotifierList" */ '@/views/Data/NotifierList.vue'
            ),
        },
        {
          path: 'receiver-form/:mode',
          name: 'ReceiverForm',
          meta: { title: '收件信息' },
          component: () =>
            import(
              /* webpackChunkName: "ReceiverForm" */ '@/views/Data/ReceiverForm.vue'
            ),
        },
        {
          path: 'sender-form/:mode',
          name: 'SenderForm',
          meta: { title: '寄件信息' },
          component: () =>
            import(
              /* webpackChunkName: "SenderForm" */ '@/views/Data/SenderForm.vue'
            ),
        },
        {
          path: 'notifier-form/:mode',
          name: 'NotifierForm',
          meta: { title: '通知人信息' },
          component: () =>
            import(
              /* webpackChunkName: "NotifierForm" */ '@/views/Data/NotifierForm.vue'
            ),
        },
        {
          path: 'common-form/:commonType/:mode',
          name: 'CommonForm',
          meta: { title: '常用信息' },
          component: () =>
            import(
              /* webpackChunkName: "CommonForm" */ '@/views/Data/CommonForm.vue'
            ),
        },
        {
          path: 'pkg-info',
          name: 'PkgInfoList',
          meta: { title: '包裹信息查看', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "PkgInfoList" */ '@/views/Data/PkgInfoList.vue'
            ),
        },
        {
          path: 'declare-list',
          name: 'DeclareInfoList',
          meta: { title: '申报信息' },
          component: () =>
            import(
              /* webpackChunkName: "DeclareInfoList" */ '@/views/Data/DeclareInfoList.vue'
            ),
        },
        {
          path: 'declare/:mode',
          name: 'DeclareForm',
          meta: { title: '品名信息' },
          component: () =>
            import(
              /* webpackChunkName: "DeclareForm" */ '@/views/Data/DeclareForm.vue'
            ),
        },
        {
          path: 'area-index',
          name: 'AreaIndexSearch',
          meta: { title: '选择国家/地区' },
          component: () =>
            import(
              /* webpackChunkName: "AreaIndexSearch" */ '@/views/Data/AreaIndexSearch.vue'
            ),
        },
        {
          path: 'parcel-address-list',
          name: 'ParcelAddressList',
          meta: { title: '常用揽件地址' },
          component: () =>
            import(
              /* webpackChunkName: "NotifierList" */ '@/views/Data/ParcelAddressList.vue'
            ),
        },
        {
          path: 'parcel-address',
          name: 'ParcelAddress',
          meta: { title: '揽件地址' },
          component: () =>
            import(
              /* webpackChunkName: "ParcelAddress" */ '@/views/Data/ParcelAddress.vue'
            ),
        },
        {
          path: 'express-analyze',
          name: 'ExpressAnalyze',
          meta: { title: '编辑快递单号' },
          component: () =>
            import(
              /* webpackChunkName: "ExpressAnalyze" */ '@/views/Data/ExpressAnalyze.vue'
            ),
        },
        {
          path: 'balance-view-detail',
          name: 'BalanceViewDetail',
          meta: { title: '查看明细' },
          component: () =>
            import(
              /* webpackChunkName: "BalanceViewDetail" */ '@/views/My/BalanceViewDetail.vue'
            ),
        },
        {
          path: 'weight-size-detail',
          name: 'WeightSizeDetail',
          meta: { title: '查看重量尺寸', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "WeightSizeDetail" */ '@/views/My/WeightSizeDetail.vue'
            ),
        },
        {
          path: 'print-store-pdf',
          name: 'PrintStorePDF',
          meta: { title: '打印入库码' },
          component: () =>
            import(
              /* webpackChunkName: "PrintStorePDF" */ '@/views/Data/PrintStorePDF.vue'
            ),
        },
        {
          path: 'destination-group-search/type',
          name: 'DestGroupSelectPage',
          meta: { title: '选择目的地', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "DestGroupSelectPage" */ '@/views/CBConsolidation/components/DestGroupSelectPage.vue'
            ),
        },
      ],
    },
    {
      path: '/pay',
      name: 'PaymentCenter',
      component: () =>
        import(
          /* webpackChunkName: "PaymentCenter" */ '@/views/PaymentCenter/PaymentCenter.vue'
        ),
      children: [
        {
          path: 'submit',
          name: 'PaymentSubmit',
          meta: { title: '收银台' },
          component: () =>
            import(
              /* webpackChunkName: "PaymentSubmit" */ '@/views/PaymentCenter/PaymentSubmit.vue'
            ),
        },
        {
          path: 'recharge',
          name: 'RechargeSubmit',
          meta: { title: '充值' },
          component: () =>
            import(
              /* webpackChunkName: "RechargeSubmit" */ '@/views/PaymentCenter/RechargeSubmit.vue'
            ),
        },
      ],
    },
    {
      path: '/sign',
      name: 'SignHome',
      meta: { auth: false },
      component: () =>
        import(
          /* webpackChunkName: "SignHome" */ '@/views/SignInSignUp/SignHome.vue'
        ),
      children: [
        {
          path: 'in',
          name: 'SignIn',
          meta: { title: '登录', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "SignHome" */ '@/views/SignInSignUp/Login/SignIn.vue'
            ),
        },
        {
          path: 'up',
          name: 'SignUp',
          meta: { title: '注册', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "SignHome" */ '@/views/SignInSignUp/Register/SignUp.vue'
            ),
        },
        {
          path: 'retrieve',
          name: 'Retrieve',
          meta: { title: '找回密码', auth: false },
          component: () =>
            import(
              /* webpackChunkName: "SignHome" */ '@/views/SignInSignUp/RetrievePwd/Retrieve.vue'
            ),
        },
        // {
        //   path: 'login-phone',
        //   name: 'PhoneLogin',
        //   meta: { title: '手机号登录', auth: false },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "PhoneLogin" */ '@/views/SignInSignUp/Login/PhoneLogin.vue'
        //       ),
        // },
        // {
        //   path: 'login-mail',
        //   name: 'EmailLogin',
        //   meta: { title: '邮箱登录', auth: false },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "EmailLogin" */ '@/views/SignInSignUp/Login/EmailLogin.vue'
        //       ),
        // },
        // {
        //   path: 'register-phone',
        //   name: 'PhoneRegister',
        //   meta: { title: '手机号注册', auth: false },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "PhoneRegister" */ '@/views/SignInSignUp/Register/PhoneRegister.vue'
        //       ),
        // },
        // {
        //   path: 'register-mail',
        //   name: 'EmailRegister',
        //   meta: { title: '邮箱注册', auth: false },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "EmailRegister" */ '@/views/SignInSignUp/Register/EmailRegister.vue'
        //       ),
        // },
        // {
        //   path: 'retrieve-phone',
        //   name: 'PhoneRetrieve',
        //   meta: { title: '密码找回', auth: false },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "PhoneRetrieve" */ '@/views/SignInSignUp/RetrievePwd/PhoneRetrieve.vue'
        //       ),
        // },
        // {
        //   path: 'retrieve-email',
        //   name: 'EmailRetrieve',
        //   meta: { title: '密码找回', auth: false },
        //   component: () =>
        //     import(
        //       /* webpackChunkName: "EmailRetrieve" */ '@/views/SignInSignUp/RetrievePwd/EmailRetrieve.vue'
        //       ),
        // },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      meta: { title: '登录', auth: false },
      redirect: { name: 'SignIn' },
      // component: () =>
      //   import(
      //     /* webpackChunkName: "Login" */ '@/views/SignInSignUp/Login/Login.vue'
      //     ),
    },
    {
      path: '/maintain',
      name: 'Maintain',
      meta: { title: '服务维护', auth: false },
      component: () =>
        import(/* webpackChunkName: "Maintain" */ '@/views/Maintain.vue'),
    },
    // {
    //     path: '/404',
    //     name: 'Page404',
    //     meta: { title: '404', auth: false },
    //     component: () =>
    //         import(/* webpackChunkName: "Page404" */ '@/views/404.vue'),
    // },
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
