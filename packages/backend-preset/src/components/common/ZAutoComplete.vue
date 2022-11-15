<template>
  <el-autocomplete
    :value="value"
    v-on="inputListeners"
    v-bind="[$attrs]"
  >
    <slot name="append" slot="append" />
    <slot name="prefix" slot="prefix" />
    <slot name="suffix" slot="suffix" />
    <slot name="prepend" slot="prepend" />
  </el-autocomplete>
</template>

<script>

/**
 * ZAutoComplete
 * @author  Yee
 * @date    2020/9/16
 * @desc    处理输入的输入框(转大写，不能有中文等)
 */
export default {
  name: 'ZAutoComplete',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  computed: {
    // 所有父级事件
    inputListeners () {
      const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (value) {
            vm.$emit('input', value.toUpperCase().trim())
          },
          blur: (e) => {
            // 失去焦点自动首位去空格
            e.target.value = e.target.value.trim()
            vm.$emit('input', e.target.value)
          },
        },
      )
    },
  },

  methods: {},
}
</script>

