<template>
  <svg v-if="svg" class="base-svg-icon" aria-hidden="true">
    <use :xlink:href="svgLink"></use>
  </svg>
  <em
    v-else
    class="base-icon"
    :class="[family, iconClass]"
    v-bind="$attrs"
  ></em>
</template>

<script>
import { defineComponent, computed } from 'vue'

/**
 * BaseIcon
 * @author  Yee
 * @date    2021/5/8
 * @desc    基础icon
 */
export default defineComponent({
  name: 'BaseIcon',
  props: {
    // 对应icon的名称
    icon: {
      type: String,
      default: '',
    },
    // 类型
    type: {
      type: String,
      default: '',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return (
          [
            '',
            'red',
            'blue',
            'orange',
            'yellow',
            'green',
            'white',
            'gray',
          ].indexOf(value) !== -1
        )
      },
    },
    family: {
      type: String,
      default: 'iconfont',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['iconfont', 'bsfont', 'iconfont-base'].indexOf(value) !== -1
      },
    },
    svg: Boolean,
    border: Boolean,
    isPrepend: Boolean,
    isAppend: Boolean,
  },
  setup(props) {
    const iconPrefixMap = {
      'iconfont-base': 'icon-base-',
      bsfont: 'icon-',
    }

    const iconClass = computed(() => {
      const prefix = iconPrefixMap[props.family]
      const iconName = prefix ? `${prefix}${props.icon}` : props.icon
      const defaultClass = [iconName]
      if (props.type) {
        defaultClass.push(`is--${props.type}`)
      }
      if (props.border) {
        defaultClass.push(`is--border`)
      }
      if (props.isPrepend) {
        defaultClass.push(`is--prepend`)
      }
      if (props.isAppend) {
        defaultClass.push(`is--append`)
      }
      return defaultClass
    })

    const svgLink = computed(() => {
      const prefix = iconPrefixMap[props.family]
      const iconName = prefix ? `${prefix}${props.icon}` : props.icon
      return `#${iconName}`
    })

    return {
      iconClass,
      svgLink,
    }
  },
})
</script>

<style scoped lang="scss">
$--color-black: #151617;
$--color-blue: #0581ff;
$--color-green: #63d349;
$--color-orange: #ff8305;
$--color-yellow: #ffedb5;
$--color-white: #ffffff;
$--color-gray: #7d868f;
$--color-red: #f04646;
.base-icon {
  display: inline-block;
  font-size: inherit;

  &.iconfont,
  &.bsfont {
    //font-size: inherit;
  }

  &.is--red {
    color: $--color-red;
  }

  &.is--blue {
    color: $--color-blue;
  }

  &.is--orange {
    color: $--color-orange;
  }

  &.is--yellow {
    color: $--color-yellow;
  }

  &.is--green {
    color: $--color-green;
  }

  &.is--white {
    color: $--color-white;
  }

  &.is--gray {
    color: $--color-gray;
  }

  &.is--border {
    padding: 5px;
    border: 1px solid var(--color-border);
    border-radius: 2px;
  }
  &.is--prepend {
    padding-right: 5px;
  }
  &.is--append {
    padding-left: 5px;
  }
}

.base-svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
