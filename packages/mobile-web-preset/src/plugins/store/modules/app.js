import { LocalStorage, SessionStorage } from 'storage-manager-js'
import { getCDNUrl, getUrlKey } from '@/utils/common'
import { APP_VAR } from '@/utils/appConstant'
import { getCurrentLocale } from '@/plugins/i18n'
import MyApi from '@/api/modules/MyApi'
import BaseDataApi from '@/api/modules/BaseDataApi'
import CBCApi from '@/api/modules/CBCApi'
import store from '@/plugins/store'

const { NODE_ENV, VUE_APP_TEST_DOMAIN } = process.env

const isDev = NODE_ENV === 'development'

/**
 * app
 * @author  Yee
 * @date    2021/5/8
 * @desc
 */
export default {
  namespaced: true,
  state: {
    // 当前站点信息
    siteInfo: null,
    // 当前站点domain
    domainName: '',
    // 用户信息
    userInfo: null,
    // 用户资产
    userAssets: {},
    // 用户凭证
    sessionId: '',
    // 微信openId
    openId: '',
    // 微信appId
    appId: '',
    // 专属客服配置
    kfConfig: {
      enable: false,
      enterpriseWechatCode: '',
      enterpriseWechatUrl: '',
    },
    // 店铺多语言
    shopLanguageList: [],
    currentLanguage: 'zh-CN',
  },
  mutations: {
    /**
     * 设置当前语言key
     * @param state
     * @param value
     */
    setCurrentLanguage(state, value) {
      state.currentLanguage = value
    },
    // 设置店铺支持的语言列表
    setShopLanguageList(state, value) {
      state.shopLanguageList = value || [
        {
          key: 'zh-CN',
          id: '0',
          isDefaultLanguage: true,
          languageShowName: '中文',
          type: 0,
          isShow: true,
        },
        /*{
          label: 'English',
          value: 'en-US',
          type: 1,
        },
        {
          label: 'Русский',
          value: 'ru-RU',
          type: 2,
        },*/
      ]
    },
    /**
     * 设置专属客服
     * @param state
     * @param data
     */
    setKFConfig(state, data) {
      state.kfConfig = data
    },
    // 设置访问域
    setDomainName(state, data) {
      // 设置当前domian, 优先从url里获取，其次是本地缓存，再其次是window.location.origin
      const domain =
        getUrlKey('domain') ||
        (isDev && VUE_APP_TEST_DOMAIN ? VUE_APP_TEST_DOMAIN : '') ||
        SessionStorage.get(APP_VAR.SESSION_STORAGE_DOMAIN_KEY) ||
        window.location.origin
      state.domainName = domain
      SessionStorage.set(APP_VAR.SESSION_STORAGE_DOMAIN_KEY, domain)
    },

    // 设置用户信息
    setUserInfo(state, data) {
      state.userInfo = data || null
      if (data) {
        // 用户账户资产
        MyApi.fetchUserAmountInfo()
      }
    },
    // 设置用户资产
    setUserAssets(state, data) {
      state.userAssets = Object.assign({}, state.userAssets, data || {})
    },
    // 设置用户凭证
    setSessionId(state, data) {
      if (data) {
        state.sessionId = data
        LocalStorage.set(APP_VAR.LOCAL_STORAGE_USER_KEY, data)
      } else {
        state.sessionId = ''
        LocalStorage.delete(APP_VAR.LOCAL_STORAGE_USER_KEY)
      }
    },
    // 设置微信openId
    setOpenId(state, data) {
      if (data) {
        state.openId = data
        LocalStorage.set(APP_VAR.LOCAL_STORAGE_WECHAT_KEY, data)
      } else {
        state.openId = ''
        LocalStorage.delete(APP_VAR.LOCAL_STORAGE_WECHAT_KEY)
      }
    },
    // 设置微信appId
    setAppId(state, data) {
      if (data) {
        state.appId = data
        LocalStorage.set(APP_VAR.LOCAL_STORAGE_WECHAT_APPID_KEY, data)
      } else {
        state.appId = ''
        LocalStorage.delete(APP_VAR.LOCAL_STORAGE_WECHAT_APPID_KEY)
      }
    },
    // 设置站点信息
    setSiteInfo(state, data) {
      const tabs = data.tabs
      delete data.tabs
      state.siteInfo = {
        tabs,
        shopBean: {
          ...data,
        },
      }
    },
  },
  actions: {
    /**
     * 设置初始化数据
     * @param state
     * @param dispatch
     * @param loginOut
     */
    async setInitBaseData({ state, dispatch }, loginOut) {
      try {
        const isLogin = !!state.sessionId && !!state.userInfo
        const shopId = state.siteInfo.shopBean.shopId
        await BaseDataApi.fetchDestinationList()

        // 登出后重新获取以下数据
        if (loginOut) {
          // BaseDataApi.fetchUsefulDestinationListUnAuth({ shopId })
          BaseDataApi.fetchGoodsTypeListUnAuth({ shopId })
          return
        }
        if (isLogin) {
          // await BaseDataApi.fetchUsefulDestinationList({ shopId })
          BaseDataApi.fetchGoodsTypeList({ shopId })
        } else {
          // await BaseDataApi.fetchUsefulDestinationListUnAuth({ shopId })
          BaseDataApi.fetchGoodsTypeListUnAuth({ shopId })
        }
        BaseDataApi.fetchTaxTypeData()
        await BaseDataApi.fetchReceiveWarehouseList()

        await dispatch('initShopInfoFlow')
      } catch (e) {
        console.log('初始化数据 Error:', e)
      }
    },
    /**
     * 获取店铺流程
     * @param state
     * @return {Promise<void>}
     */
    async initShopInfoFlow(state) {
      try {
        await CBCApi.fetchProcessGlobalParam()
        await BaseDataApi.fetchModeAndEntryConfig()
        await BaseDataApi.fetchCurrencyListData()
        // await CBCApi.fetchShopForecastFlow()
      } catch (e) {
        console.log('获取店铺流程 Error:', e)
      }
    },
  },
  getters: {
    siteInfo: state => state.siteInfo,
    domainName: state => state.domainName,
    userInfo: state => state.userInfo,
    userAssets: state => state.userAssets,
    appId: state => state.appId,
    sessionId: state => state.sessionId || '',
    openId: state => state.openId || '',
    siteLogo: state =>
      state.siteInfo?.shopBean.logo ||
      getCDNUrl('/default-front-logo-plain.png'),
    siteName: state => state.siteInfo?.shopBean.companyName || '跨运管家',
    tabBarItems: (state, getters, rootState, rootGetters) => {
      if (!state.siteInfo) return []
      const list = state.siteInfo.tabs
      const renameTab = (tab, key) => {
        const name = rootGetters['baseData/getBaseTabConfig'](key)?.value
        if (name) {
          tab.name = name
          tab.rename = name
        }
      }
      const renameMap = {
        'freight-business': 'prcd',
        'user-center': 'center',
      }
      list.forEach(tab => {
        const matchKey = renameMap[tab.key]
        if (matchKey) {
          renameTab(tab, matchKey)
        }
      })
      return list
    },
    // 是否无注册
    noRegister: state => state.siteInfo?.shopBean.clientRegistrationMode === 2,
    // 审核中
    isAuditing: state => state.userInfo?.status === 0,
    // 黑名单
    isForbid: state => state.userInfo?.status === 2,
    kfConfig: state => state.kfConfig,
    // 支持的语言
    shopLanguageList: state => state.shopLanguageList,
    shopLanguageKeys: state => {
      return state.shopLanguageList.map(i => i.key)
    },
    // 首次打开站点的默认语言
    defaultShopLanguage: state => {
      // isDefaultLanguage
      const item = state.shopLanguageList.find(
        i => i.isDefaultLanguage === true
      )
      if (item) {
        // 找的到就用
        return item.key
      } else {
        // 找不到用开启的第一个，还没有就是中文
        return state.shopLanguageList[0]?.key || 'zh-CN'
      }
    },
    currentLanguage: state => state.currentLanguage,
  },
}
