<template>
  <van-overlay :show="visible" z-index="99">
    <div class="bs-dialog">
      <div class="dialog-wrapper">
        <div class="dialog-close">
          <BaseIcon
            class="inner-close"
            icon="iconguanbi_danchuang"
            @click="hide()"
          />
        </div>
        <div class="dialog-header">{{ title }}</div>
        <div class="dialog-body">
          <div class="dialog-body__content">
            <slot />
          </div>
        </div>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import BaseIcon from '@/components/base/BaseIcon'

/**
 * BaseDialog
 * @author  Yee
 * @date    2021/5/12
 * @desc    基础dialog
 */
export default {
  name: 'BaseDialog',
  components: { BaseIcon },
  props: {
    // 标题
    title: {
      type: [String],
      default: '',
    },
    visible: Boolean,
  },
  data() {
    return {
      // innerVisible: false,
    }
  },
  watch: {
    visible(newValue, oldValue) {
      this.$nextTick(() => {
        // this.innerVisible = newValue
        if (!newValue) {
          this.doClosed()
        }
      })
    },
  },
  created() {
    // this.innerVisible = this.visible || false
  },
  methods: {
    /**
     * 关闭
     */
    hide() {
      // this.innerVisible = false
      this.$emit('update:visible', false)
    },
    /**
     * 关闭后
     */
    doClosed() {
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    },
  },
}
</script>

<style scoped lang="scss">
.bs-dialog {
  .dialog-wrapper {
    position: relative;
    margin: 25vh auto 0;
    width: 622px;
    padding: 0 0 64px 0;
    background: var(--bgcolor-dialog);
    border-radius: 16px;
    border: 1px solid var(--color-gray-4);
    box-sizing: border-box;
  }

  .dialog-header {
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: var(--color-black);
    font-weight: bold;
    font-size: var(--font-size-lg);
  }

  .dialog-body {
    padding: 0 46px;

    .dialog-body__content {
    }
  }

  .dialog-footer {
    margin-top: 48px;
  }

  .dialog-close {
    position: absolute;
    top: 36px;
    right: 36px;
    z-index: 2;

    .inner-close {
      font-size: 24px;
      color: var(--color-gray-dark);
    }
  }
}
</style>
