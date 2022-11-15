<template>
  <el-select
    v-model="currentValue"
    placeholder="请输入企业名称"
    clearable
    filterable
    remote
    :remote-method="handleCompanyAsyncQuery"
    :loading="loading"
    @change="handleChange"
    autocomplete="new-password"
  >
    <el-option
      v-for="(opt, oIdx) in selectOpts"
      :key="oIdx"
      :label="opt.label"
      :value="opt.value"
    ></el-option>
  </el-select>
</template>

<script>

import { tryCatch } from '@/utils/common'

/**
 * CompanySelect
 * @author  Yee
 * @date    2020/9/8
 * @desc    企业名称选择框
 */
export default {
  name: 'CompanySelect',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    // 当前值
    value: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      // 当前值
      currentValue: '',
      loading: false,
      selectOpts: [],
    }
  },

  watch: {
    value (newValue, oldValue) {
      this.currentValue = newValue
    },
  },

  created () {
    this.currentValue = this.value
  },

  methods: {
    /**
     * 处理远端搜索企业名称
     * @params key
     */
    async handleCompanyAsyncQuery (key) {
      // this.loading = true
      // const [e, res] = await tryCatch(fetchCompanyOptList, key)
      // this.loading = false
      // if (e) return []
      // this.selectOpts = res.map(item => {
      //   return { label: item.name, value: item.enterpriseId }
      // })
    },

    /**
     * 监听change
     */
    handleChange () {
      this.$emit('change', this.currentValue)
    },
  },
}
</script>

<style scoped lang="scss">

</style>
