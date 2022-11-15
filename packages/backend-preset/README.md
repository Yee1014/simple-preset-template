# backend-preset

## 目录

- [简介](#简介)
- [脚本命令](#脚本命令)
- [注意事项](#注意事项)

## 简介

- 后台系统预设模版

## 脚本命令

| npm 命令   | 查看方式                    | 用途   |
| ---------- | --------------------------- | ------ |
| build:dev  |  | 开发   |
| build:beta |  | 测试用 |
| build:uat  |   | 预发布 |
| build:prod |       | 正式   |
| serve      | 本地测试                    | --     |

## 注意事项

- 特殊代码解释

## 富文本编辑器 Quilljs

> [阅读使用文档](https://github.com/surmon-china/vue-quill-editor), [Quilljs](https://github.com/quilljs/quill)

## eslint config rules

```json
{
  "vue/no-unused-vars": "off",
  "no-unused-vars": "off",
  "no-console": "off",
  "no-debugger": "off",
  "no-empty": [
    "error",
    {
      "allowEmptyCatch": true
    }
  ],
  "comma-dangle": [
    "error",
    {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore"
    }
  ]
}
```

# `composition-api` 使用记录

```js
export default {
  setup(props, context) {
    const {
      attrs,
      emit,
      isServer,
      listeners,
      parent,
      refs,
      root,
      slots,
      ssrContext,
    } = context
  },
}
```

### `setup` 函数

| 参数    | 类型 | 默认值                                                            | 说明     |
| ------- | ---- | ----------------------------------------------------------------- | -------- |
| props   | 对象 | {}                                                                | 传入参数 |
| context | 对象 | {attrs,emit,isServer,listeners,parent,refs,root,slots,ssrContext} | -        |

#### `setup` 传入参数 `context`

| 参数       | 说明                                                         | 类型         | 默认值        |
| ---------- | ------------------------------------------------------------ | ------------ | ------------- |
| attrs      | 挂载的属性                                                   | Object       | -             |
| emit       | 事件发送                                                     | Function     | -             |
| isServer   | 是否是服务端                                                 | Boolean      | false         |
| listeners  | 挂载的事件 Event                                             | Object       | { next: f ()} |
| parent     | 父级                                                         | VueComponent | -             |
| refs       | 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例 | Object       | -             |
| root       | Vue 实例                                                     | Vue          | -             |
| slots      | 插槽                                                         | Object       | {}            |
| ssrContext | 服务端上下文                                                 | Object       | undefined     |
