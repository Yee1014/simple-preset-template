## Common 通用组件

### ZTable
> 使用规范

#### ZTable Attributes

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| data | 表格显示的数据 | array |
| tableOption | Table组件的配置项，接收所有element Table Attributes| object |
| colConfigs | Table组件column的配置项(数组中的每个item参照Table-column Attributes) | Array[ {} ] |
| total | 分页的总条目数 | number |
| paginationOption | 分页组件的Attributes(接收所有分页组件属性) | object |
|paginationQuery |每页显示条目个数&当前页数(对象中包含分页参数：query[object]，page，size，默认page:current, size:size。query是查询参数且必传，page和size是否需要取决于query对象中页数和个数是否是默认值)|object

#### ZTable Events 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| * | 事件绑定同Element Table组件一致，详情参考官方文档 | - |

#### ZTable Slot

插槽使用参考示例


示例
```html
<ZTable
  :data="data"
  :total="total"
  :colConfigs="colConfigs"
  :tableOption="tableOption"
  :paginationQuery="{query}"
  @paginationChange="getData"
  @selection-change="handleSelection">
    <template #TESTSLOT="{row}">
      <el-button> {{ row.xxx }} </el-button>
    </template>
    <template #operation="{row}">
      <el-button> {{ row.xxx }} </el-button>
    </template>
</ZTable>
```
```js

data: [
  {TEST1:xxx, TEST2:xxx, TEST3:xxx, TEST4:xxx},
  {TEST1:yyy, TEST2:yyy, TEST3:yyy, TEST4:yyy}
]

total: 998,

query: {
  size: 10,
  current: 1,
}

colConfigs: [
  { type: 'selection', width: '50px' }, //table选择框
  { prop: 'TEST1', label: '测试1', width: '50px' },
  { prop: 'TEST2', label: '测试2', render:(row)=>row.xxx }, //render函数处理简单的数据转换
  { prop: 'TEST3', label: '测试3'},
  { prop: 'TEST4', label: '测试4'},
  {
    label: '测试插槽',
    slotName: 'TESTSLOT',
  },
  {
    label: '测试操作',
    slotName: 'operation',
  },
],

tableOption: {
  height: 800, //Table 的高度
  border: true, //是否带有纵向边框
  stripe: true, //是否为斑马纹 table
  ....
}

function getData() {
  this.data = fetchGetData(this.query) // 接口获取表格数据
}

function handleSelection(){
  // 勾选表格checkbox
}
```