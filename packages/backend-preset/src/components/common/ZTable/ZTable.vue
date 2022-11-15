<template>
  <div>
    <el-table
      ref="ZTableOrigin"
      :data="tableDataList"
      v-bind="tableOption"
      v-on.native="$listeners"
    >
      <template v-for="(colConfig, index) in colConfigs">
        <!-- 是否使用自定义slot -->
        <el-table-column
          :key="index"
          v-if="colConfig.slotName"
          align="center"
          v-bind="colConfig"
        >
          <template #header="{column, $index}">
            <slot
              :name="colConfig.slotName+'Header'"
              :column="column"
              :$index="$index"
            >
              {{ colConfig.label }}
            </slot>
          </template>
          <template #default="{row, column, $index}">
            <slot
              :name="colConfig.slotName"
              :row="row"
              :column="column"
              :$index="$index"
            ></slot>
          </template>
        </el-table-column>
        <!-- 是否多选 -->
        <el-table-column
          v-else-if="colConfig.selection"
          :key="index"
          type="selection"
          align="center"
          width="55"
          :reserve-selection="colConfig.reserveSelection"
          :selectable="colConfig.selectable"
        >
        </el-table-column>
        <!-- 是否使用动态组件 -->
        <component
          v-else-if="colConfig.component"
          :key="index"
          :is="colConfig.component"
          :table-father="father"
          :col-config="colConfig"
        />
        <!-- 需要单独处理table-column数据时的函数 -->
        <el-table-column
          v-else-if="colConfig.render"
          align="center"
          :key="index"
          v-bind="colConfig"
        >
          <template slot-scope="scope">
            <span>{{ colConfig.render(scope.row) }}</span>
          </template>
        </el-table-column>
        <!-- 需要转成元 -->
        <el-table-column
          v-else-if="['cnyPrice', 'usdPrice'].includes(colConfig.prop)"
          align="center"
          :key="index"
          v-bind="colConfig"
        >
          <template slot-scope="{row}">
            <span>{{ row[colConfig.prop] | formatRmb }}</span>
          </template>
        </el-table-column>
        <!-- 简单的table-column-->
        <el-table-column
          v-else
          align="center"
          :key="index"
          v-bind="colConfig"
        />
      </template>
    </el-table>
    <div
      class="p-8"
      v-if="showPagination"
    >
      <el-pagination
        layout="prev, pager, next, total"
        :total="total"
        background
        v-bind="paginationOption"
        :page-size="paginationQuery.query[paginationQuery.size || 'size']"
        :current-page.sync="paginationQuery.query[paginationQuery.page || 'current']"
        @current-change="fetchDatas"
        class="flex justify-center"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZTable',

  props: {
    /**
     * table数据
     * @param {Array} data
     */
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * Table-column Attributes
     * Table-column组件的配置参数，接收所有element组件属性，
     * @param {Array} data
     */
    colConfigs: {
      type: Array,
      default: () => [],
    },
    /**
     * Table Attributes
     * Table组件的配置参数，接收所有element组件属性，
     * @param {Array} data
     */
    tableOption: {
      type: Object,
      default: function () {
        return {
          border: true,
        }
      },
    },
    /**
     * Pagination Attributes
     * paginationOption: 分页组件的配置参数，接收所有element组件属性，
     * @param {Object} paginationOption
     */
    paginationOption: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Pagination Params
     * paginationQuery: 分页的查询参数，(对象中包含分页参数：query，page，size，默认page:current, size:size)
     * @param {Object} paginationQuery
     */
    paginationQuery: {
      type: Object,
      default: () => ({}),
    },
    /**
     * 分页总数
     * @param {Number} total
     */
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    /**
     * 插入动态组件时，获取组件所在页面的vue实例（this）
     * @param null
     */
    father () {
      return this.$parent.$parent
    },
    /**
     * 是否显示分页组件
     * @param null
     */
    showPagination () {
      return !!Object.keys(this.paginationQuery).length
    },
  },

  data () {
    return {
      tableDataList: [],
    }
  },

  watch: {
    data: {
      deep: true,
      handler (newValue, oldValue) {
        this.tableDataList = newValue
      },
      immediate: true,
    },
  },

  methods: {
    getRef () {
      return this.$refs.ZTableOrigin
    },

    fetchDatas () {
      this.$emit('paginationChange')
    },

    /**
     * 设置table data
     * @param data
     */
    setTableList (data) {
      this.tableDataList = data
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
