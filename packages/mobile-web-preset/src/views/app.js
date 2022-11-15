/**
 * app
 * @author  Yee
 * @date    2021/6/7
 * @desc    项目实例创建过程, 必须完成之后才能进入项目
 */
import { getUrlKey } from '@/utils/common'
import { LocalStorage } from 'storage-manager-js'
import { APP_VAR } from '@/utils/appConstant'
import store from '@/plugins/store'
import AppApi from '@/api/modules/AppApi'
import { loadLanguageAsync } from '@/plugins/i18n'

/**
 * 更新站点html信息
 * 1 favicon
 * 等其他
 */
const updateSiteMeta = () => {
  const $favicon = document.querySelector('link[rel="icon"]')
  if ($favicon) {
    $favicon.href = store.getters['app/siteLogo']
  }
}

/**
 * 初始化用户信息
 * @return {Promise<void>}
 */
export async function initAppData() {
  try {
    let source = getUrlKey('source')
    let sessionIdCache
    // 1 从地址栏获取 , 2 获取缓存
    if (source === 'wxmp') {
      sessionIdCache = getUrlKey('sessionId')
    } else {
      sessionIdCache =
        getUrlKey('sessionId') ||
        LocalStorage.get(APP_VAR.LOCAL_STORAGE_USER_KEY)
    }
    const openIdCache =
      getUrlKey('openId') || LocalStorage.get(APP_VAR.LOCAL_STORAGE_WECHAT_KEY)
    const appIdCache =
      getUrlKey('appId') || LocalStorage.get(APP_VAR.LOCAL_STORAGE_WECHAT_KEY)
    if (sessionIdCache) {
      store.commit('app/setSessionId', sessionIdCache)
    }
    store.commit('app/setOpenId', openIdCache)
    store.commit('app/setAppId', appIdCache)
    store.commit('app/setDomainName')
    await AppApi.fetchSiteDetail()
    updateSiteMeta()
    await loadLanguageAsync()
    await AppApi.fetchUserInfo()
    await store.dispatch('app/setInitBaseData')
  } catch (e) {
    console.log(e)
  }
}
