/**
 * i18n
 * @author  Yee
 * @date    2021/5/10
 * @desc    多语言插件
 */
import { createI18n } from 'vue-i18n'
import zhCN from '@/plugins/i18n/lang/zh-CN.json'
import { APP_VAR } from '@/utils/appConstant'
import store from '@/plugins/store'
import AppApi from '@/api/modules/AppApi'
import { isMiniProgramEnv } from '@/utils/common'
// import { setVantI18n } from '@/plugins/vant'

// 我们支持的语言
const getSupportLocales = () => store.getters['app/shopLanguageKeys']
const defaultLocale = 'zh-CN'

const i18n = createI18n({
  legacy: true,
  globalInjection: true,
  // 默认语言
  locale: 'zh-CN',
  // 回退默认语言
  fallbackLocale: 'zh-CN',
  messages: {
    // 配置默认语言文件
    'zh-CN': zhCN,
  },
})

export default i18n

export function installI18n(app) {
  app.use(i18n)
}

/**
 * 多语言显示
 * @param key
 * @param params
 * @return {TranslateResult | string}
 */
export function tI18n(key, params = null) {
  return i18n.global.t(key, params)
}

/**
 * 切换多语言
 * @param key
 */
export function changeLocale(key) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = key
  } else {
    i18n.global.locale.value = key
  }
}

/**
 * 保存语言key
 * @param key
 */
export const saveLocalesStorage = key => {
  localStorage.setItem(APP_VAR.LOCAL_STORAGE_LANG_KEY, key)
}

/**
 * 获取语言key缓存
 */
export const getLocalesStorage = () => {
  const cache = localStorage.getItem(APP_VAR.LOCAL_STORAGE_LANG_KEY)
  const SUPPORT_LOCALES = getSupportLocales()
  // 如果cache里的值不在开启的语言中则返回默认
  return SUPPORT_LOCALES.includes(cache) ? cache : ''
}

/**
 * 获取当前locale
 * @return {string}
 */
export function getCurrentLocale() {
  return getLocalesStorage() || defaultLocale
}

/**
 * 是否是中文语言
 * @returns {boolean}
 */
export function isZhLocale() {
  return store.getters['app/currentLanguage'].includes('zh-')
}

const setI18nLanguage = lang => {
  store.commit('app/setCurrentLanguage', lang)
  if (i18n.mode === 'legacy') {
    i18n.global.locale = lang
  } else {
    i18n.global.locale.value = lang
  }
  // setVantI18n(lang)
  // 可以传递给后端
  // axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  localStorage.setItem(APP_VAR.LOCAL_STORAGE_LANG_KEY, lang)
  return lang
}

/**
 * 延迟加载lang
 * @param language
 * @return {Promise<unknown>|Promise<*>}
 */
export async function loadLanguageAsync(language = null) {
  await AppApi.fetchShopSupportLanguage()
  const getSupportDefaultLocale = () => store.getters['app/defaultShopLanguage']
  /**
   * 默认语言的获取 实时切换的语言 > 本地缓存的语言 > 支持的语言列表的默认语种 > 默认值
   * 如果在小程序中，使用默认中文
   * @type {string|string}
   */
  const lang = isMiniProgramEnv()
    ? defaultLocale
    : language ||
      getLocalesStorage() ||
      getSupportDefaultLocale() ||
      defaultLocale

  // 不受支持的语言回退
  const SUPPORT_LOCALES = getSupportLocales()
  if (!SUPPORT_LOCALES.includes(lang)) {
    return Promise.resolve(setI18nLanguage(defaultLocale))
  }

  // 加载语言
  return new Promise(resolve => {
    const currentLocale = store.getters['app/shopLanguageList'].find(
      i => i.key === lang
    )
    if (!currentLocale) {
      return resolve(setI18nLanguage(defaultLocale))
    }
    AppApi.fetchShopLanguageLocaleById(currentLocale.id)
      .then(res => {
        const { code, data } = res
        if (code === 200) {
          const message = data.languageData || {}
          // console.log(message)
          if (lang === defaultLocale) {
            i18n.global.mergeLocaleMessage(lang, message)
          } else {
            i18n.global.setLocaleMessage(lang, message)
          }
          resolve(setI18nLanguage(lang))
        } else {
          resolve(setI18nLanguage(defaultLocale))
        }
      })
      .catch(() => {
        resolve(setI18nLanguage(defaultLocale))
      })
  })
}
