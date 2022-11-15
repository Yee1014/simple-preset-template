import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import './ZImageViewer/ZImageViewer'
import { Message, MessageBox } from 'element-ui'
import { tryCatch } from '@/utils/common'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/,
)

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig,
  )
})

/**
 * 显示messagebox
 * @param option
 * @return {Promise<string>} confirm 确定 cancel 取消 close 关闭
 */
export function showMessageBox (option) {
  const defaultOption = {
    title: '标题',
    message: '内容',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonClass: 'ui-button--primary',
    cancelButtonClass: 'ui-button--primary-plain',
    center: true,
    distinguishCancelAndClose: true,
    dangerouslyUseHTMLString: true,
    closeOnClickModal: false,
  }
  return new Promise((resolve) => {
    if (typeof option === 'object') {
      Object.assign(defaultOption, option)
    } else if (typeof option === 'string') {
      defaultOption.message = option
    }
    MessageBox(defaultOption)
      .then(() => {
        // 确认后执行
        resolve('confirm')
      })
      .catch((action) => {
        // 取消后执行 分 close 和 cancel
        resolve(action)
      })
  })
}

/**
 * @description: 删除确认弹框
 * @param {function} handleYes
 * @param {object} params
 * @return {type}
 */
export function delConfirm (handleYes, params) {
  let config = {
    title: '提示',
    message: '确认删除？',
    showCancelButton: 'true',
    type: 'warning',
    closeOnClickModal: false,
  }
  Object.assign(config, params)
  MessageBox(config)
    .then(async () => {
      let [err, res] = await tryCatch(handleYes)
      if (err) return
      Message.success('删除成功!')
    })
    .catch(() => {
      return
    })
}

/**
 * 同步element confirm
 * @param config
 * @return {Promise<string>}
 */
export function confirmSync (config) {
  return new Promise((resolve) => {
    const defaultConfig = {
      title: '注意',
      message: '',
      type: 'warning',
      distinguishCancelAndClose: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true,
    }
    if (typeof config === 'string') {
      defaultConfig.message = config
    } else {
      Object.assign(defaultConfig, config)
    }
    MessageBox.confirm(defaultConfig.message, defaultConfig.title, defaultConfig)
      .then(() => {
        resolve('confirm')
      })
      .catch((action) => {
        resolve(action)
      })
  })
}

/**
 * 异步 提交内容
 * @param option
 * @return {Promise<string>}
 */
export function promptAsync (option) {
  const currentOption = {
    message: '',
    title: '提示',
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputErrorMessage: '请输入内容',
  }
  if (typeof option === 'string') {
    currentOption.message = option
  } else if (typeof option === 'object') {
    Object.assign(currentOption, option)
  }

  return new Promise(resolve => {
    MessageBox
      .prompt(currentOption.message, currentOption.title, currentOption)
      .then(({ value }) => {
        resolve(value)
      })
      .catch(() => {
        resolve(false)
      })
  })
}

