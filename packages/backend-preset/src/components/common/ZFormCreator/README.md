## Common 通用组件

### ZFormCreator

> 使用规范

#### ZFormCreator Prop

| name | 说明 | 类型 |
| --- | --- | --- |
| modal | 绑定 form | object |
| value | 默认值，需与data中key对应 | - |
| data | 绑定 form 渲染字段 | object |
| exportFile | 是否显示导出按钮 | boolean |
| showPage | 是否显示分页 | boolean |
| pageTotal | 分页-数据总量 | number |
| leading | 是否在创建玩执行一次 | boolean |
| dataFormat | 时间格式及补全daterange,numberrange字段配置 | object |
| ajaxRequest | 请求列表ajax获取数据，并渲染到ZTable | function |

#### ZFormCreator Emit 事件

| event | 说明 | 回掉参数 |
| --- | --- | --- |
| data-change | 表单数据变更回掉 表单参数 | query |
| export-file | 导出按钮 表单参数 | query |

#### ZFormCreator Slot

| name | 说明 |
| --- | --- |
| header | 表单预留插槽，可以放入一些按钮 |
| default | 默认插槽 |
| `[key]` | 若为slot，则创建对应key的slot |

#### ZFormCreator Tips

所有select类型 下拉选择最好都是 `[value: '',label:'']` 格式

传入参数

| 字段 | 必填 | 说明 |
| --- | ---  | --- |
| key | 是 | 为返回的对应的key |
| type | 是 | form支持的类型<br>input: 输入框<br>date:日期选择<br>daterange：日期范围<br>numberrange：数值范围<br>asyncinput：远程输入搜索<br>asyncselect：远程搜索选择框<br>company：企业选择<br>carrier：船公司选择<br>shipagent：船代选择<br>port：港口选择 |
| label | 否 | form的label |
| value | 否 | 默认数据，默认'' |
| selectOpts | 否 | 下拉选择数据 |
| queryAsync | 否 | 远程搜索回掉 |
| loading | 否 | select搜索中，默认false |
| visible | 否 | 是否可见，默认true |
| slot | 否 | 是否为插槽，默认false |
| maxlength | 否 | 输入框最大输入限制，默认99 |

示例

```json
{
  // 字段对应key
  "key": {
    // form 类型 [input|date|daterange|asyncinput|asyncselect|company]
    "type": "",
    // form label
    "label": "",
    // 默认值
    "value": "",
    // select 选择项
    "selectOpts": [],
    // 远程搜索方法函数
    "queryAsync": null,
    // loading
    "loading": false,
    // 是否可见
    "visible": true,
    // 是否为插槽
    "slot": false,
    // input 最大输入限制
    maxlength: 99
  }
}
```

返回参数

```js
const result = {
  'key': '',
}
```

## 示例：

1. 普通使用

```html

<ZFormCreator :data="queryData" @data-change="handleFormChange" :page-total="pageTotal">
  <el-button #header>新增</el-button>
</ZFormCreator>
```

2. 联动ZTable，及自动请求数据

```html

<ZFormCreator :data="queryData" ref="ZForm" :ajax-request="ajaxRequestApi">
  <ZTable :col-configs="colConfig" />
</ZFormCreator>
```

```js
export default {
  data () {
    return {
      // 查询参数
      queryData: {
        'firstTime': { type: 'daterange', label: '首次开通时间' },
        'companyName': { type: 'asyncselect', label: '企业名称', queryAsync: this.fetchCompanyNameListByStr },
        'sellMan': { type: 'input', label: '销售' },
        'bookingAuth': { type: 'select', label: '公共订舱权限', selectOpts: [] },
        'firstbookingAuth': { type: 'asyncinput', label: '船东直订权限', queryAsync: this.handleFirstBookingAuthList },
        'coinBalance': { type: 'numberrange', label: '海币余额' },
      },
      pageTotal: 10,
      colConfig: [
        { prop: 'name', label: '名称' },
        { prop: 'age', label: '年龄' },
      ],
    }
  },
  methods: {
    /**
     * 监听el-autocomplate建议回掉， 返回数组
     */
    handleFirstBookingAuthList () {
      return [{ label: '', value: '' }]
    },
    /**
     * 给el-select remote 执行的远端方法
     *
     */
    fetchCompanyNameListByStr () {
      return [{ label: '', value: '' }]
    },
    /**
     * 搜索和重置回掉
     * @param query 返回数据
     */
    handleFormChange (query) {
    },
    /**
     * 列表网络请求实例
     */
    ajaxRequestApi () {
      return axios({ url: '' })
    },
    /**
     * 刷新列表
     * 若要手动刷新
     */
    refreshList () {
      this.$refs['ZForm'].formSubmit()
    },
  },
}
```

3. 替换select选项,从远端获取

```html

<ZFormCreator :data="queryData">
  <template #selectCode>
    <el-option v-for="(opt, i) in selectOptions" :key="i" :label="opt.label" :value="opt.value" />
  </template>
</ZFormCreator>
```

```js
export default {
  data () {
    return {
      queryData: {
        selectCode: { type: 'select', label: '下拉选择' },
      },
      selectOptions: [],
    }
  },
  created () {
    this.getOptions()
  },
  methods: {
    /**
     * 远端获取下拉数据
     */
    getOptions () {
      // 模拟请求
      setTimeout(() => {
        this.selectOptions = [{ label: '1', code: '1' }]
      }, 1000)
    },
  },
}
```
