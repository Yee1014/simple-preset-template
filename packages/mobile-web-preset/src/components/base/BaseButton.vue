<template>
  <button
    class="base-button"
    :class="buttonClass"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <span v-if="icon" class="inner-icon">
      <BaseIcon :icon="icon" />
    </span>
    <slot></slot>
  </button>
</template>

<script>
import BaseIcon from '@/components/base/BaseIcon'

/**
 * BaseButton
 * @author  Yee
 * @date    2021/5/8
 * @desc    基础按钮
 */
export default {
  name: 'BaseButton',

  components: { BaseIcon },

  props: {
    // 圆角
    rounded: {
      type: Boolean,
      default: false,
    },
    // icon 名称
    icon: {
      type: String,
      default: '',
    },
    // 纯文字
    text: {
      type: Boolean,
      default: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 幽灵
    plain: {
      type: Boolean,
      default: false,
    },
    // 类型
    type: {
      type: String,
      default: 'default',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['default', 'info', 'danger', 'base'].indexOf(value) !== -1
      },
    },
    // 尺寸
    size: {
      type: String,
      default: '',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['', 'normal', 'small', 'lg', 'bigger'].indexOf(value) !== -1
      },
    },
  },

  computed: {
    buttonClass() {
      const className = {
        rounded: this.rounded,
        'is--plain': this.plain,
        'is--text': this.text,
      }
      className[`button__${this.type}`] = true
      if (this.size) {
        className[`size__${this.size}`] = true
      }
      return className
    },
  },
}
</script>

<style scoped lang="scss">
.base-button {
  padding: 27px 10px;
  font-size: var(--font-size-l);
  font-weight: 400;
  outline: none;
  box-sizing: border-box;
  border-radius: 8px;
  line-height: 1;

  &.size__normal {
    padding: 18px 10px;
    font-size: var(--font-size);
  }

  &.size__small {
    font-size: var(--font-size-small);
  }

  &.size__lg {
    font-size: var(--font-size-lg);
  }

  &.size__bigger {
    font-size: var(--font-size-bigger);
  }

  &.button__default {
    color: var(--color-white);
    background: var(--color-blue);
    border: 1px solid var(--color-blue);

    &.is--plain {
      color: var(--color-blue);
      background: var(--color-white);
      border: 1px solid var(--color-blue);
    }
  }

  &.button__info {
    color: var(--color-gray-dark);
    background: var(--color-gray-1);
    border: 1px solid var(--color-gray-1);

    &.is--plain {
      color: var(--color-gray-dark);
      background: var(--color-white);
      border: 1px solid #c6cad5;
    }
  }

  &.button__danger {
    color: var(--color-white);
    background: var(--color-red);
    border: 1px solid var(--color-red);

    &.is--plain {
      color: var(--color-red);
      background: var(--color-white);
      border: 1px solid var(--color-red);
    }
  }

  &.button__base {
    color: var(--color-black);
    background: var(--color-white);
    border: 1px solid var(--color-white);

    &.is--plain {
      color: var(--color-black);
      background: transparent;
      border: 1px solid var(--color-black);
    }
  }

  &.rounded {
    border-radius: 50px;
  }

  &.is--text {
    padding: 0;
    background: transparent;
    border-radius: 0;
    color: var(--color-blue);
    border: none;
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .inner-icon {
    margin-right: 20px;
  }
}
</style>
