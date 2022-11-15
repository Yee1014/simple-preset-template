<template>
  <el-select
    ref="ZSelect"
    :value="value"
    v-on="selectListeners"
    v-bind="$attrs"
  >
    <slot name="default" slot="default" />
    <slot name="prefix" slot="prefix" />
    <slot name="empty" slot="empty" />
  </el-select>
</template>

<script>

/**
 * ZSelect
 * @author  Yee
 * @date    2020/9/15
 * @desc    处理输入的选择框(转大写，不能有中文等)
 */
export default {
  name: 'ZSelect',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  computed: {
    // 所有父级事件
    selectListeners () {
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
          input: (value) => {
            value = value.toUpperCase().trim()
            vm.$emit('input', value)
            vm.$refs.ZSelect.debouncedQueryChange({ target: { value } })
          },
        },
      )
    },
  },
}
</script>

