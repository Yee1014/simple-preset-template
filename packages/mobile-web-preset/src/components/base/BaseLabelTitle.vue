<template>
  <div class="base-label-title" :class="{ bordered: border }">
    <div
      class="base-label__title"
      :class="{
        [titlePosition]: titlePosition,
        'no-title': !title && !$slots.title,
        'no-slot': !$slots.default,
      }"
    >
      <span v-if="required" class="is-required">*</span>
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="$slots.default" class="base-label-slot">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
/**
 * BaseLabelTitle
 * @author  Yee
 * @date    2021/5/12
 * @desc    头部信息栏
 */
export default {
  name: 'BaseLabelTitle',
  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
    titlePosition: {
      type: String,
      default: '',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['', 'top'].indexOf(value) !== -1
      },
    },
    // 底部边线
    border: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.base-label-title {
  padding: 29px 32px;
  display: flex;
  align-items: center;

  .base-label__title {
    padding-right: 10px;
    color: var(--color-black);
    font-size: var(--font-size-l);
    font-weight: bold;
    flex: 0 0 auto;
    max-width: 50%;
    min-width: 220px;
    align-self: flex-start;
    //word-break: break-all;

    .is-required {
      color: var(--color-red);
      font-weight: normal;
    }

    &.top {
      align-self: flex-start;
    }

    &.no-title {
      display: none;
    }

    &.no-slot {
      padding-right: 0;
      max-width: 100%;
    }
  }

  .base-label-slot {
    flex: 1 1 auto;
  }

  &.bordered {
    position: relative;

    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 32px;
      bottom: 0;
      left: 32px;
      border-bottom: 1px solid var(--color-border);
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
</style>
