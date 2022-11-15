<template>
  <div class="flex z-form-button"
       :class="{'flex-row-reverse': reverse, 'justify-center': center}">
    <div class="flex-1" v-if="!center"></div>
    <el-button
      class="center-button"
      v-if="showSubButton"
      type="info"
      @click="clickSubEvent">{{ subButtonText }}
    </el-button>
    <el-button
      type="primary"
      :loading="loading"
      :disabled="loading"
      @click="clickEvent">{{ buttonText }}
    </el-button>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

/**
 * ZFormButton
 * @author  Yee
 * @date    2020/8/14
 * @desc    两个按钮的组，例如（取消，确定 ｜ 搜索 重置）
 */
export default {
  name: 'ZFormButton',

  props: {

    // secondary button text
    subButtonText: {
      type: String,
      default: '取消',
    },

    // always show button text
    buttonText: {
      type: String,
      default: '确定',
    },

    // show sub button
    showSubButton: {
      type: Boolean,
      default: true,
    },

    // reverse button layout
    reverse: {
      type: Boolean,
      default: false,
    },

    // 等待时间
    wait: {
      type: Number,
      default: 100,
    },

    // 居中排版
    center: {
      type: Boolean,
      default: false,
    },

    // 等待
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      // 主点击
      clickEvent: null,
      // 副点击
      clickSubEvent: null,
    }
  },

  created () {
    this.initClick()
  },

  methods: {

    /**
     * 初始化点击事件
     */
    initClick () {
      // 不防抖
      if (this.wait === 0 || !this.wait) {
        this.clickSubEvent = () => {
          this.$emit('sub-click')
        }
        this.clickEvent = () => {
          this.$emit('click')
        }
      } else {
        // 防抖
        this.clickSubEvent = debounce(() => {
          this.$emit('sub-click')
        }, this.wait)
        this.clickEvent = debounce(() => {
          this.$emit('click')
        }, this.wait)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.z-form-button {
  /deep/ .el-button {
    margin-left: 0;
  }

  .center-button {
    margin: 0 10px;
  }
}
</style>
