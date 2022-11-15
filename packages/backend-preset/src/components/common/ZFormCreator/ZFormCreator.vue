<template>
  <div class="form-creator">
    <el-form
      ref="FormRef"
      :model="formData"
      v-bind="[$attrs]"
      v-on="parentListeners"
      inline
    >
      <template v-for="(item, itemIdx) in formDataList">
        <el-form-item
          :key="itemIdx"
          :label="item['label']"
          :prop="item['key']"
        >
          <!--输入框-->
          <el-input
            v-if="item['type'] === 'input'"
            v-model="formData[item['key']]"
            :maxlength="item['maxlength']"
            clearable
            autocomplete="new-password"
          ></el-input>
          <!--企业名称-->
          <CompanySelect
            v-if="item['type'] === 'company'"
            v-model="formData[item['key']]" />
          <!--选择框-->
          <el-select
            v-else-if="item['type'] === 'select'"
            v-model="formData[item['key']]"
            clearable
            filterable
            placeholder="全部"
            autocomplete="new-password"
          >
            <slot
              :name="item['key']"
              v-bind="{row:item,scopeForm:formData}"
            >
              <el-option
                v-for="(opt, oIdx) in item['selectOpts']"
                :key="oIdx"
                :label="opt.label"
                :value="opt.value"
              ></el-option>
            </slot>
          </el-select>
          <!--日期选择-->
          <el-date-picker
            v-else-if="item['type'] === 'date'"
            type="date"
            v-model="formData[item['key']]"
            :picker-options="pickerOpt"
            clearable
          ></el-date-picker>
          <!--日期范围选择-->
          <el-date-picker
            v-else-if="item['type'] === 'daterange'"
            type="daterange"
            v-model="formData[item['key']]"
            :picker-options="pickerOpt"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
          ></el-date-picker>
          <!--模糊搜索input-->
          <el-autocomplete
            v-else-if="item['type'] === 'asyncinput'"
            v-model="formData[item['key']]"
            :fetch-suggestions="item['queryAsync']"
            placeholder=""
            @select="handleAsyncInputSelect($event, item['key'])"
            clearable
          ></el-autocomplete>
          <!--远程搜索select-->
          <el-select
            v-else-if="item['type'] === 'asyncselect'"
            v-model="formData[item['key']]"
            placeholder=""
            clearable
            filterable
            remote
            :remote-method="item['queryAsync']"
            :loading="item['loading']"
            autocomplete="new-password"
          >
            <slot
              :name="item['key']"
              v-bind="{row:item,scopeForm:formData}"
            >
              <el-option
                v-for="(opt, oIdx) in item['selectOpts']"
                :key="oIdx"
                :label="opt.label"
                :value="opt.value"
              ></el-option>
            </slot>
          </el-select>
          <!--空位插槽-->
          <slot
            v-else-if="item['slot']"
            :name="item['key']"
            v-bind="{row:item,scopeForm:formData}"
          ></slot>
        </el-form-item>
      </template>
      <el-form-item label=" ">
        <el-button
          type="primary"
          @click="formSubmitSearch"
        >查询
        </el-button>
        <el-button
          type="info"
          @click="formReset"
        >重置
        </el-button>
        <el-button
          v-if="exportFile"
          @click="formExportFile"
        >导出报表
        </el-button>
      </el-form-item>
      <el-form-item>
        <slot
          v-bind:from="formData"
          name="header"
        ></slot>
      </el-form-item>
    </el-form>
    <section class="form-table">
      <slot></slot>
    </section>
    <div class="sticky bottom-0">
      <el-pagination
        v-if="showPage"
        class="text-center mt-4"
        layout="prev, pager, next, sizes, total, jumper"
        @size-change="handlePageChange"
        @current-change="handlePageChange"
        :page-size.sync="formData.pageSize"
        :current-page.sync="formData.pageNum"
        :page-sizes="pageSizesOpts"
        :total="dataTotal"
        background
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { APP_VAR } from '@/utils/appConstant'
import cloneDeep from 'lodash/cloneDeep'
import CompanySelect from '@/components/more/CompanySelect'

/**
 * ZFormCreator
 * @author  Yee
 * @date    2020/8/14
 * @desc    表单查询 创建器
 */
export default {
  name: 'ZFormCreator',
  components: { CompanySelect },

  model: {
    prop: 'value',
    event: 'data-change',
  },

  props: {
    // form数据
    value: {
      type: Object,
      default: function () {
        return null
      },
    },

    // 表单生成模版
    data: {
      type: Object,
      default: function () {
        return null
      },
    },

    // 是否展示导出
    exportFile: {
      type: Boolean,
      default: false,
    },

    //是否显示分页插件
    showPage: {
      type: Boolean,
      default: true,
    },

    // 分页 数据总数
    pageTotal: {
      type: [Number, String],
      default: 0,
    },

    // 是否创建之后立即执行一次
    leading: {
      type: Boolean,
      default: true,
    },

    // 时间格式及补全daterange字段配置
    dataFormat: {
      type: Object,
      default: function () {
        return {
          // 时间返回格式
          dateFormat: 'YYYY-MM-DD',
          // 补全字段开始标识
          start: 'StartTime',
          // 补全字段结果标识
          end: 'EndTime',
        }
      },
    },

    // 获取数据接口
    ajaxRequest: {
      type: Function,
      default: null,
    },
  },

  data () {
    return {
      // 表单字段
      formData: {
        // 默认分页参数
        pageSize: APP_VAR.PAGE_SIZE,
        pageNum: 1,
      },
      // 表单渲染数据
      formDataList: [],
      // 分页 总数
      dataTotal: 0,
      pickerOpt: {
        // 下拉选择项日期范围
        disabledDate (time) {
          return dayjs(time).isAfter(dayjs())
        },
      },
      // 分页插件 每页多少个
      pageSizesOpts: APP_VAR.PAGE_SIZE_LIST,
    }
  },

  computed: {
    // 所有父级事件
    parentListeners () {
      // const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {},
      )
    },
  },

  watch: {
    // 监听分页
    pageTotal (newValue, oldValue) {
      this.dataTotal = Number(newValue)
    },
    // 监听实时数据变动
    formData: {
      deep: true,
      handler (newValue) {
        const data = this.formatFormData(newValue)
        this.$emit('data-change', data)
      },
    },
  },

  created () {
    this.createFromProp()
  },

  methods: {
    /**
     * 根据prop生成对应form
     */
    createFromProp () {
      this.formDataList = []
      this.formData = {
        pageSize: APP_VAR.PAGE_SIZE,
        pageNum: 1,
      }
      if (this.data) {
        // 存放视图中的form渲染list
        const temp = []
        const keys = Object.keys(this.data)

        keys.forEach(key => {
          const { type } = this.data[key]
          // 补全 item 字段
          let item = Object.assign(
            // 默认字段
            {
              // 字段对应key
              key,
              // form label
              label: '',
              // 默认值
              value: '',
              // form 类型 [input|date|daterange|asyncinput|asyncselect|company|]
              type: '',
              // select 选择项
              selectOpts: [],
              // 远程搜索方法函数
              queryAsync: null,
              // loading
              loading: false,
              // 是否可见
              visible: true,
              // slot
              slot: false,
              // 输入框最大输入限制 99
              maxlength: 99,
            },
            this.data[key],
          )

          // 处理range类型初始值是否为Array数组
          if (!item.value && ['daterange', 'numberrange'].includes(type)) {
            item.value = []
          }

          // 处理select远程搜索，闭包回掉
          if ('asyncselect' === type) {
            item.queryAsync = this.createSelectRemoteMethod(item.queryAsync, key)
          }

          // 处理input远程搜索，闭包回掉
          if ('asyncinput' === type) {
            item.queryAsync = this.createInputFetchSearchAsync(item.queryAsync, key)
          }

          // 校验form字段是否缺失
          this.validFormType(item)

          if (item.visible) {
            temp.push(item)
          }

          this.$set(this.formData, key, item.value)
        })

        this.formDataList = this.formDataList.concat(temp)
      }

      if (this.leading) {
        this.formSubmit()
      }
    },

    /**
     * 对传入数据做校验
     * @param form
     */
    validFormType (form) {
      const { selectOpts, queryAsync, type, key, value } = form
      if (type.indexOf('select') > -1 && !Array.isArray(selectOpts)) {
        throw new Error(
          `ZFormCreator, ${key} selectOpts in Props must be Array, but selectOpts is ${typeof selectOpts}`,
        )
      } else if (type.indexOf('range') > -1 && !Array.isArray(value)) {
        throw new Error(
          `ZFormCreator, ${key} value in Props must be Array, but value is ${typeof value}`,
        )
      } else if (
        type.indexOf('async') > -1 &&
        !(queryAsync instanceof Function)
      ) {
        throw new Error(
          `ZFormCreator, ${key} queryAsync in Props must be Function, but queryAsync is ${typeof queryAsync}`,
        )
      }
    },

    /**
     * 获取表单数据
     * @return {{pageSize: number, pageNum: number}}
     */
    getFormModel () {
      return this.formatFormData(this.formData)
    },

    /**
     * 表单查询
     * 生成query数据，并emit
     * @emit data-change
     */
    formSubmit () {
      const data = this.formatFormData(this.formData)
      if (this.ajaxRequest) {
        this.fetchAjaxRequestData(data)
      }
      this.$emit('data-change', data)
    },

    /**
     * 格式处理数据
     * @param origin
     * @return {object}
     */
    formatFormData () {
      const form = this.data
      // 复制formdata数据
      let tempData = cloneDeep(origin)

      // 处理没有传入其他情况
      if (!form) {
        return tempData
      }

      // 日期范围keys
      const dateRangeKeys = []
      // 数值范围keys
      const numberRangeKeys = []
      const keys = Object.keys(form)
      keys.forEach((key) => {
        if (form[key].type === 'daterange') {
          dateRangeKeys.push(key)
        } else if (form[key].type === 'numberrange') {
          numberRangeKeys.push(key)
        }
      })
      const { dateFormat, start, end } = this.dataFormat

      // 格式转换 daterange
      dateRangeKeys.forEach((key) => {
        if (Array.isArray(tempData[key]) && tempData[key].length === 2) {
          tempData[`${key}${start}`] = dayjs(tempData[key][0]).format(dateFormat) + ' 00:00:00'
          tempData[`${key}${end}`] = dayjs(tempData[key][1]).format(dateFormat) + ' 23:59:59'
        } else {
          // TODO 设置默认时间(30天)
          const now = dayjs()
          tempData[`${key}${start}`] = now.subtract(29, 'day').format(dateFormat) + ' 00:00:00'
          tempData[`${key}${end}`] = now.format(dateFormat) + ' 23:59:59'
        }
        delete tempData[key]
      })

      // 格式转换 numberrange
      numberRangeKeys.forEach((key) => {
        if (Array.isArray(tempData[key]) && tempData[key].length === 2) {
          tempData[`${key}${start}`] = tempData[key][0]
          tempData[`${key}${end}`] = tempData[key][1]
        } else {
          tempData[`${key}${start}`] = ''
          tempData[`${key}${end}`] = ''
        }
        delete tempData[key]
      })
      return tempData
    },

    /**
     * 重置表格
     */
    formReset () {
      this.$refs['FormRef'].resetFields()
      this.formData.pageNum = 1
      this.formSubmit()
    },

    /**
     * 查询
     */
    formSubmitSearch () {
      this.formData.pageNum = 1
      this.formSubmit()
    },

    /**
     * 导出报表
     * @emits download
     */
    formExportFile () {
      this.$emit('export-file', this.formData)
    },

    /**
     * 处理远端搜索
     * @param item
     * @param key
     */
    handleAsyncInputSelect (item, key) {
      this.formData[key] = String(item.value)
    },

    /**
     * 处理分页切换
     */
    handlePageChange () {
      this.formSubmit()
    },

    /**
     *  设置下拉list
     * @param key
     * @param list
     * @return {type} null
     */
    setSelectOptionByKey (key, list) {
      const keyItem = this.formDataList.find((item) => item.key === key)
      keyItem.selectOpts = list
    },

    /**
     * 创建select 远程搜索函数
     * @param fu
     * @param key
     * @return {function(...[*]=)}
     */
    createSelectRemoteMethod (fu, key) {
      return async query => {
        try {
          const formItem = this.formDataList.find((item) => item.key === key)
          formItem.loading = true
          formItem.selectOpts = await fu(query)
          formItem.loading = false
        } catch (e) {
          console.error(e)
        }
      }
    },

    /**
     * 创建input autocoplete 搜索函数
     * @param fu
     * @param key
     * @return {function(...[*]=)}
     */
    createInputFetchSearchAsync (fu, key) {
      return async (queryString, cb) => {
        try {
          let res = await fu(queryString)
          res = res.filter(item => item.label.indexOf(queryString.toUpperCase()) > -1)
          cb(res)
        } catch (e) {
          console.error(e)
        }
      }
    },

    /**
     * 代理请求table接口
     * @params params
     * @return {Promise<void>}
     */
    async fetchAjaxRequestData (params) {
      try {
        const result = await this.ajaxRequest(params)
        const { code, data, message } = result
        if (code === 200) {
          const { total, records } = data
          this.setSlotZTable(records)
          this.dataTotal = +total
        } else {
          this.$message.error(message)
        }
      } catch (error) {
        console.error(error)
      }
    },

    /**
     * 设置Ztable数据
     * @param data
     */
    setSlotZTable (data) {
      const table = this.$children.find(child => child.$options.name === 'ZTable')
      table && table.setTableList(data)
    },
  },
}
</script>

<style scoped lang="scss">
.form-creator {
  .form-table {
  }
}
</style>
