<template>
  <div ref="root" class="code-templater-render" v-html="htmlTemplate"></div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import template from 'lodash/template'
import {
  datetimeFormat,
  generateBarcodeImageDataURL,
  generateBarcodeSvg,
} from '@/utils/common'

const interpolate = /{{([\s\S]+?)}}/g
const escape = /{{-([\s\S]+?)}}/g
const evaluate = /<%([\s\S]+?)%>/g

export default defineComponent({
  name: 'CodeTemplateRender',
  props: {
    template: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const imports = {
      $formatter: {
        // 数值显示格式 --对0值的特殊处理
        number: (value, placeholder = '-') =>
          value === 0 ? 0 : value || placeholder,

        // 时间格式
        datetime: (value, format = 'YYYY-MM-DD HH:mm') => {
          if (!value) return ''
          return datetimeFormat(value, format)
        },
      },
      BARCODE: (value, options = { height: 50 }) => {
        const svgTag = value ? generateBarcodeSvg(value, options) || '' : ''
        return svgTag
      },
    }

    const render = computed(() => {
      try {
        return template(props.template, {
          interpolate,
          escape,
          evaluate,
          imports,
        })
      } catch (err) {
        // 模板出错不渲染界面
        console.log(
          '[CodeTemplateRender template() Error]',
          err,
          props.template,
          props.data
        )
        return null
      }
    })

    const htmlTemplate = computed(() => {
      try {
        return render.value?.(props.data)
      } catch (err) {
        // 模板出错不渲染界面
        console.log(
          '[CodeTemplateRender render() Error]',
          err,
          props.template,
          props.data
        )
        return ''
      }
    })

    const root = ref()

    return {
      root,
      htmlTemplate,
    }
  },
})
</script>

<style lang="scss">
.code-templater-render,
.ignore-px {
  display: inline-block;
  background-color: #fff;
  vertical-align: middle;
  text-align: left;
  .barcode-component {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    td {
      box-sizing: border-box;
      padding: 10px 24px;
      border: 1px solid #474c5d;
      font-size: 14px;
      color: #111;
      .flex-box {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
      }
      p {
        margin: 12px 0;
      }
    }
  }
}
</style>
