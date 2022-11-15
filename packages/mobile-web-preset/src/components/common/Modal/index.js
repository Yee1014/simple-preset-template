/**
 * Modal
 * @author  Yee
 * @date    2021/5/13
 * @desc    模态对话框
 */
import { createApp, nextTick } from 'vue'
import ModalVue from './Modal'
import { tI18n } from '@/plugins/i18n'
import { Overlay } from 'vant'
import router from '@/plugins/router'

// 全局实例
let modalInstance = null
// 路由守卫
let navigationGuard = null

// 为了在路由切换时自动销毁弹窗
const getNavigation = () => {
  if (navigationGuard) return navigationGuard
  return router.beforeEach(() => {
    // 销毁弹窗
    if (modalInstance) {
      modalInstance.instance.callback()
    }
  })
}

const removeNavigation = () => {
  // 自我销毁
  if (navigationGuard) {
    navigationGuard()
    navigationGuard = null
  }
}

export function mountComponent(RootComponent) {
  const app = createApp(RootComponent)
  app.use(Overlay)
  const root = document.createElement('div')
  root.className = 'bs-modal'

  document.body.appendChild(root)

  navigationGuard = getNavigation()

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount(root)
      document.body.removeChild(root)
    },
  }
}

/**
 * 显示模态对话框
 * @param {object} opt
 * @param {string} opt.title
 * @param {string} opt.message
 * @param {string} opt.confirmButtonText
 * @param {string} opt.confirmButtonType
 * @param {string} opt.cancelButtonText
 * @param {boolean} opt.showCancelButton
 * @param {boolean} opt.showConfirmButton
 * @param {function} opt.onConfirm
 * @param {function} opt.onCancel
 */
export async function showModal(opt = {}) {
  const option = {
    message: '',
    title: '',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: tI18n('button.confirm'),
    confirmButtonType: 'default',
    cancelButtonText: tI18n('button.cancel'),
    onConfirm: function() {
      // console.log('confirm')
    },
    onCancel: function() {
      // console.log('cancel')
    },
    finally: function() {},
  }
  Object.assign(option, opt)
  // 升级vue3 版本
  const modal = mountComponent(ModalVue)
  modal.instance.callback = () => {
    modal.unmount()
    option.finally()
    modalInstance = null
    removeNavigation()
  }
  Object.keys(option).forEach(prop => {
    modal.instance[prop] = option[prop]
  })
  await nextTick()
  modal.instance.visible = true
  modalInstance = modal
}
