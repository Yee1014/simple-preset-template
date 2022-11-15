/**
 * createApi
 *
 * @AUTHOR  Yee
 * @DATE    create on
 * @DESC    createApi
 */
import axios from 'axios'
import { saveAs } from 'file-saver'
import { Message } from 'element-ui'
import { dealAjaxCommonCode } from '@/utils/common'
import { closeLoading, showLoading } from '@/api/ApiLoading'

// 自定义请求参数
const axiosInstanceConfig = {
  // 默认显示加载
  loading: true,
}

// 创建默认示例
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `${process.env.VUE_APP_MODE_HOST}` : '/api',
  withCredentials: true,
  timeout: 30000,
  headers: {
    appName: '',
  },
})

/**
 * 统一请求发送拦截器处理
 * @param config
 * @return {{loading}|*}
 */
const commonRequestInterceptorFulFill = (config) => {
  // set loading
  config = Object.assign({}, axiosInstanceConfig, config)
  // 给所有请求添加自定义header
  // config.headers['sessionId'] = ''
  if (config.loading) {
    showLoading()
  }
  return config
}

/**
 * 统一请求返回异常处理
 * @param error
 * @return {Promise<never>}
 */
const commonResponseInterceptorReject = (error) => {
  let result = null
  if (error.response) {
    const { response } = error
    const { data } = response
    result = data
  } else {
    result = error
  }
  closeLoading()
  return Promise.reject(result)
}

// 添加请求拦截器
axiosInstance.interceptors.request.use(commonRequestInterceptorFulFill, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
axiosInstance.interceptors.response.use((response) => {
  // Do something with response data
  // console.log(response.data)
  closeLoading()
  dealAjaxCommonCode(response.data)
  return response.data
}, commonResponseInterceptorReject)

// 创建保存文件示例
const axiosSaveFileInstance = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  withCredentials: true,
  timeout: 30000,
})

// 添加请求拦截器
axiosSaveFileInstance.interceptors.request.use(commonRequestInterceptorFulFill, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
axiosSaveFileInstance.interceptors.response.use((response) => {
  // Do something with response data
  // console.log(response.data)
  closeLoading()
  return response
}, commonResponseInterceptorReject)

/**
 * 默认公共请求返回
 * @param config
 * @return {AxiosPromise}
 */
export function ajax (config) {
  return axiosInstance(config)
}

/**
 * 下载文件ajax封装
 * @param config
 * @return {Promise<unknown>}
 */
export function downLoadFileAjax (config) {
  return new Promise((resolve, reject) => {
    config.responseType = 'blob'
    axiosSaveFileInstance(config)
      .then((res) => {
        const { headers, data } = res
        let blob = new Blob([data], { type: headers['content-type'] })
        const file = window.URL.createObjectURL(blob)
        const fileName = headers['content-disposition'].split('=')[1]
        const a = document.createElement('a')
        a.setAttribute('href', file)
        a.setAttribute('download', decodeURIComponent(fileName) || '导出数据.xlsx')
        a.setAttribute('target', '_blank')
        a.click()
        // 如果是ie 要延迟释放
        window.URL.revokeObjectURL(file)
        resolve(true)
      })
      .catch((e) => {
        console.log(e)
        reject(false)
        Message.error('导出失败')
      })
  })
}

/**
 * 使用filesaver保存文件
 * @param config
 * @return {Promise<unknown>}
 */
export function ajaxFileSave (config) {
  return new Promise((resolve, reject) => {
    config.responseType = 'blob'
    axiosSaveFileInstance(config)
      .then((res) => {
        const { headers, data } = res
        let blob = new Blob([data], { type: headers['content-type'] })
        const fileName = headers['content-disposition'].split('=')[1]
        saveAs(blob, decodeURIComponent(fileName))
        resolve(true)
      })
      .catch((e) => {
        console.log(e)
        reject(false)
        Message.error('导出失败')
      })
  })
}
