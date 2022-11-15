<template>
  <BaseButton
    class="base-verify-code"
    text
    :disabled="timerLoading"
    @click.prevent="bindGetCode"
  >
    {{ timerText }}
  </BaseButton>
</template>

<script>
import BaseButton from '@/components/base/BaseButton'
import { generateTencentCode } from '@/utils/TencentCaptcha'
import { showToast } from '@/components/common/Toast'
import { tI18n } from '@/plugins/i18n'

/**
 * BaseVerifyCode
 * @author  Yee
 * @date    2021/5/8
 * @desc    获取验证码组件
 */
export default {
  name: 'BaseVerifyCode',

  components: { BaseButton },

  props: {
    // 发送前
    beforeSend: {
      type: Function,
      default: null,
    },
    // 验证完发送
    send: {
      type: Function,
      default: null,
    },
    successTip: {
      type: Boolean,
      default: true,
    },
    // 是否开启滑动验证
    openCaptcha: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      // 倒计时文字
      timerText: tI18n('baseVerifyCode.getCode'),
      // 倒计时时间
      timerCount: 60,
      // 是否正在倒计时
      timerLoading: false,
      // 计时器
      timer: null,
    }
  },

  created() {
    this.timerLoading = false
    this.timerText = tI18n('baseVerifyCode.getCode')
  },

  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  methods: {
    /**
     * 获取二维码
     */
    async bindGetCode() {
      if (this.beforeSend) {
        this.beforeSend(this.nextBeforeSend)
      } else {
        this.nextBeforeSend()
      }
    },

    /**
     * 开始倒计时
     * @param captcha 是否显示二维码
     */
    async nextBeforeSend(captcha = true) {
      if (this.timerLoading) return
      this.timerLoading = true
      try {
        // 调用图形验证码，成功之后发送
        const codeRes =
          this.openCaptcha && captcha ? await generateTencentCode() : null
        // 将 res 传入接口，根据返回执行操作
        // 发送验证码成功回调
        const callback = (tip = true) => {
          if (this.successTip && tip) {
            showToast(tI18n('baseVerifyCode.codeSentText'))
          }
          this.startTimer()
        }

        if (this.send) {
          this.send(codeRes, callback)
        } else {
          callback()
        }
      } catch (e) {
        console.log(e)
        this.timerLoading = false
      }
    },

    /**
     * 开始倒计时
     */
    startTimer() {
      this.timerText = `(${this.timerCount})`
      let count = this.timerCount
      this.timer = setInterval(() => {
        if (count < 1) {
          this.timerLoading = false
          this.timerText = tI18n('baseVerifyCode.getCode')
          clearInterval(this.timer)
          this.timer = null
        } else {
          count--
          this.timerText = `(${count})`
        }
      }, 1000)
    },

    /**
     * 重置全部
     */
    reset() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.timerLoading = false
      this.timerText = tI18n('baseVerifyCode.getCode')
    },
  },
}
</script>

<style scoped lang="scss">
.base-verify-code {
  width: 175px;
  font-size: var(--font-size);
  line-height: 1;
}
</style>
