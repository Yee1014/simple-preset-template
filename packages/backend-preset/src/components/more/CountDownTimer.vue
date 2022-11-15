<template>
  <span class="count-down-timer">还剩 {{ hour }}小时&nbsp;{{ minute }}分</span>
</template>

<script>

import dayjs from 'dayjs'

/**
 * CountDownTimer
 * @author  Yee
 * @date    2020/9/9
 * @desc    倒计时
 */

export default {
  name: 'CountDownTimer',

  props: {
    // 截止时间
    time: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      // 小时
      hour: 0,
      // 分钟
      minute: 0,
    }
  },

  mounted () {
    this.dealTimerByNow()
  },

  methods: {
    /**
     * 处理计算生成剩余时间
     */
    dealTimerByNow () {
      if (!this.time) return
      const today = dayjs()
      const endTime = dayjs(this.time)
      const minuteCount = endTime.diff(today, 'minute')
      if (minuteCount < 0) return
      const hour = Math.floor(Math.abs(minuteCount) / 60)
      const minute = Math.abs(minuteCount) % 60
      this.hour = hour
      this.minute = minute
      this.startCountDownTimer()
    },

    /**
     * 开始倒计时定时器
     */
    startCountDownTimer () {
      const timer = setInterval(() => {
        if (this.minute-- === 0) {
          this.minute = 59
          this.hour--
        }
      }, 1000 * 60)
      this.$once('hook:beforeDestroy', function () {
        clearInterval(timer)
      })
    },

  },
}
</script>

<style scoped lang="scss">
.count-down-timer {
  font-size: 14px;
  transform: scale(0.7142858);
  transform-origin: left;
}
</style>
