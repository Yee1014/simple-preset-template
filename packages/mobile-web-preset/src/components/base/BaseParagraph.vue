<script>
import { defineComponent, computed, h } from 'vue'

export default defineComponent({
  name: 'BaseParagraph',
  props: {
    // 文本
    text: {
      type: String,
      default: '',
    },
    // 分隔标签
    tag: {
      type: String,
      default: 'br',
    },
  },
  setup(props) {
    const texts = computed(() => {
      return props.text.split(/[\r\n]/)
    })
    return () => {
      const tag = String(props.tag).toLowerCase()
      if (tag === 'br') {
        return texts.value.reduce(
          (list, item, index) =>
            list.concat([index === 0 ? null : h(tag), item]),
          []
        )
      }
      return texts.value.map(item => h(tag, item))
    }
  },
})
</script>
