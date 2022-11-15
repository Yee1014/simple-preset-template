<template>
  <ImageViewer
    :z-index="zIndex"
    :initial-index="imageIndex"
    v-if="visible"
    :on-close="closeViewer"
    :url-list="urlList" />
</template>

<script>
import ImageViewer from 'element-ui/packages/image/src/image-viewer'

/**
 * ZImageViewer
 * @author  Yee
 * @date    2020/8/19
 * @desc    封装element 图片预览
 */
export default {
  name: 'ZImageViewer',

  components: { ImageViewer },

  props: {
    // 图片 zindex
    zIndex: {
      type: Number,
      default: 999999,
    },

    // 图片位于list的指针
    imageIndex: {
      type: Number,
      default: 0,
    },

    // 图片集合
    urlList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },

  data () {
    return {
      // 显示隐藏
      visible: false,
      // 关闭回掉
      callback: null,
    }
  },

  methods: {
    /**
     * 监听关闭
     */
    closeViewer () {
      this.visible = false
      if (this.callback && this.callback instanceof Function) {
        this.callback()
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>
