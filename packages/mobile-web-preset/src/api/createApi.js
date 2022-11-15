/**
 * createApi
 *
 * @Author  yee
 * @DATE    create on
 * @DESC    请求体封装
 */
import axios from 'axios'
import { closeLoading, showLoading } from '@/components/common/Loading'
import store from '@/plugins/store'
import { showToast } from '@/components/common/Toast'
import router from '@/plugins/router'
import {
  COMPANY_NO_SUBSCRIBE,
  KEY_HEADER_APP_NAME,
  KEY_HEADER_NAS_AUTH,
  NAS_UPLOAD_URL,
  NOT_LOGGED_IN,
  PROJECT_APP_NAME,
  SITE_MAINTAIN,
} from '@/utils/appConstant'
import { nextTick } from 'vue'
import { tI18n } from '@/plugins/i18n'

const { VUE_APP_HOST_VERSION, VUE_APP_HOST } = process.env

// 创建实例
const axiosInstance = axios.create({
  timeout: 30 * 1000,
  withCredentials: true,
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 用户凭证
    const sessionId = store.getters['app/sessionId']
    config.headers[KEY_HEADER_APP_NAME] = PROJECT_APP_NAME
    if (sessionId) {
      config.headers['sessionid'] = sessionId
    }
    if (VUE_APP_HOST_VERSION) {
      config.headers['version'] = VUE_APP_HOST_VERSION
    }
    config = Object.assign({ loading: false, autoToast: true }, config)
    if (config.loading) {
      showLoading()
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 不需要提示错误信息，
const hideErrorMessage = code => {
  return [4007].includes(code)
}

// Add a response interceptor
// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
axiosInstance.interceptors.response.use(
  response => {
    const { autoToast, loading, url } = response.config
    if (loading) {
      closeLoading()
    }
    // 拦截全局CODE
    const { code, message } = response.data
    if ([SITE_MAINTAIN, COMPANY_NO_SUBSCRIBE].includes(code)) {
      // 跳转到维护
      console.log('维护中...')
      router.replace({ name: 'Maintain' }).catch(() => {})
    } else if (code === NOT_LOGGED_IN) {
      // 未登录
      store.commit('app/setSessionId')
      store.commit('app/setUserInfo', null)
    } else if (code !== 200) {
      if (autoToast && !hideErrorMessage(code)) {
        nextTick(() => {
          showToast({ message: message || tI18n('message.serverError') })
        })
      }
      console.warn(
        `Response Code ${response.status}:`,
        url,
        '\n',
        response.data
      )
    }
    return response.data
  },
  error => {
    closeLoading()
    nextTick(() => {
      showToast({ message: tI18n('message.serverError') })
    })
    return Promise.reject(error)
  }
)

/**
 * 默认请求实例
 * @param config
 * @return {AxiosPromise}
 */
export function ajax(config) {
  config.baseURL = VUE_APP_HOST
  return axiosInstance(config)
}
