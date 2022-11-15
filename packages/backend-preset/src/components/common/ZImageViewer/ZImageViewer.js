/**
 * ZImageViewer
 * @author  Yee
 * @date    2020/8/19
 * @desc    Vue全局预览element组件 图片预览
 */

import Vue from 'vue'
import ZImageViewer from './ZImageViewer.vue'

// 全局实例
let instance

// 构建起
const ImageViewerConstructor = Vue.extend(ZImageViewer)

// 初始化
const initInstance = () => {
  instance = new ImageViewerConstructor()
}

// 显示并挂载body
const showView = (options, callback) => {
  if (!instance) {
    initInstance()
  }
  if (!instance.visible) {

    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }

    instance.callback = callback

    document.body.appendChild(instance.$mount().$el);

    Vue.nextTick(() => {
      instance.visible = true;
    });
  }
}

// 显示
const preview = (options, callback) => {
  if (Vue.prototype.$isServer) return
  if (typeof options === 'string') {
    options = {
      urlList: [options],
    }
  } else if (options instanceof Array) {
    options = {
      urlList: options,
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }
  showView(options, callback)
}

Vue.prototype.$preview = preview
