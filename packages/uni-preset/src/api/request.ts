/**
 * request
 * @author  Yee
 * @date    2022/10/24
 * @desc    封装request
 */
import {
  KEY_ACCESS_TOKEN,
  KEY_APP_NAME,
} from '@/constants'
import loadingToast from '@/api/loadingToast'

interface RequestCreateConfig {
  baseURL?: string
  debug?: boolean
}

interface RequestOption extends UniApp.RequestOptions {
  baseURL?: string
  params?: string | AnyObject | ArrayBuffer
  showLoading?: boolean
}

interface RequestInstance {
  (requestConfig: RequestOption): Promise<any>
  get(requestConfig: RequestOption): Promise<any>
  post(requestConfig: RequestOption): Promise<any>
}

const debugLog = console.log

/**
 * 默认请求配置
 * 扩展 uni.request
 * @link  https://uniapp.dcloud.net.cn/api/request/request.html#request
 */
const requestDefaultOptions: RequestOption = {
  showLoading: true,
  baseURL: '',
  method: 'GET',
  url: '',
  data: undefined,
  params: undefined,
  dataType: 'json',
  responseType: 'text',
  header: {},
  timeout: 60 * 1000,
  withCredentials: false,
  sslVerify: true,
}

/**
 * 请求拦截函数
 * @param config
 */
const requestInterceptors = (config: RequestOption) => {
  config.header[KEY_APP_NAME] = ''
  config.header[KEY_ACCESS_TOKEN] = ''
  if (config.showLoading) {
    // 展示加载
    loadingToast.showLoading()
  }
  return config
}

/**
 * 响应拦截函数
 * @param response
 */
const responseInterceptors = (
  response: UniApp.RequestSuccessCallbackResult
) => {
  return response.data
}

/**
 * 创建请求实例
 * @param config
 */
export const createRequest = (
  config: RequestCreateConfig = {}
): RequestInstance => {
  // 默认开启日志
  config.debug = true
  const instance = (requestConfig: RequestOption): Promise<any> => {
    return new Promise((resolve, reject) => {
      // 合并处理请求参数
      const conf = Object.assign(requestDefaultOptions, config, requestConfig, {
        success: (res: UniApp.RequestSuccessCallbackResult) => {
          if (config?.debug) {
            debugLog('[REQUEST LOG] Success:\n', res)
          }
          resolve(responseInterceptors(res))
        },
        fail: (err: UniApp.GeneralCallbackResult) => {
          if (config?.debug) {
            debugLog('[REQUEST LOG] Fail:\n', err)
          }
          reject(err)
        },
        complete: () => {
          if (conf.showLoading) {
            loadingToast.hideLoading()
          }
        },
      })
      conf.url = `${conf.baseURL}${conf.url}`
      if (conf.params) {
        conf.data = conf.params
      }
      const dealRequest = requestInterceptors(conf)
      if (config?.debug) {
        debugLog('[REQUEST DEBUG LOG]\n', dealRequest.url, dealRequest)
      }
      uni.request(dealRequest)
    })
  }
  instance.get = (requestConfig: RequestOption) => {
    requestConfig.method = 'GET'
    return instance(requestConfig)
  }
  instance.post = (requestConfig: RequestOption) => {
    requestConfig.method = 'POST'
    return instance(requestConfig)
  }
  return instance
}

export const request = createRequest()
