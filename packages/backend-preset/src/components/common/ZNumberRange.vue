<template>
  <div class="number-range">
    <el-input
      :style="{width: width + 'px'}"
      v-model="startValue"
      @input="handleStartInput"
      @blur="handleInputBlur"
    ></el-input>
    <span class="separator">{{ rangeSeparator }}</span>
    <el-input
      :style="{width: width + 'px'}"
      v-model="endValue"
      @input="handleEndInput"
      @blur="handleInputBlur"
    ></el-input>
  </div>
</template>

<script>

/**
 * NumberRange
 * @author  Yee
 * @date    2020/8/14
 * @desc    数值范围
 */
export default {
  name: 'ZNumberRange',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {

    // 绑定的value
    value: {
      type: Array,
      default: function () {
        return []
      },
    },

    // 分隔符
    rangeSeparator: {
      type: String,
      default: '-',
    },

    // 输入框宽度
    width: {
      type: [Number, String],
      default: '50',
    },
  },
  data () {
    return {
      // 开始数值
      startValue: '',
      // 结束数值
      endValue: '',
    }
  },

  watch: {
    value (newValue, oldValue) {
      if (Array.isArray(newValue)) {
        this.startValue = newValue[0]
        this.endValue = newValue[1]
      }
    },
  },

  methods: {
    /**
     * 输入框失去焦点
     * @emit change
     */
    handleInputBlur () {
      this.$emit('change', [this.startValue, this.endValue])
    },

    /**
     * 监听start值
     * @param e 当前值
     */
    handleStartInput (e) {
      this.startValue = this.formatValue(e)
    },

    /**
     * 监听start值
     * @param e 当前值
     */
    handleEndInput (e) {
      this.endValue = this.formatValue(e)
    },

    /**
     * 格式化输入, 只能输入数字 和 .
     * @param v
     * @return {*}
     */
    formatValue (v) {
      const reg = /[^\d|.]/g
      return v.replace(reg, '')
    },
  },
}
</script>

<style scoped lang="scss">
.number-range {
  display: inline-block;

  .separator {
    padding: 5px;
    color: $base-text-color-regular;
  }
}
</style>
