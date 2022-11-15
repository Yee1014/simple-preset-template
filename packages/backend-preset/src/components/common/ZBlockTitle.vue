<template>
  <div class="z-block-title">
    <div class="inner-title">{{ title }}</div>
    <slot />
  </div>
</template>

<script>

/**
 * ZBlockTitle
 * @author  Yee
 * @date    2020/8/28
 * @desc
 */
export default {
  name: 'ZBlockTitle',

  props: {
    // 标题
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.z-block-title {
  position: relative;
  padding: 12px 10px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: auto;
    width: 3px;
    height: 20px;
    background-color: $base-color-default;
    transform: translateY(-50%);
  }

  .inner-title {
    padding-right: 10px;
    color: $base-color-black;
    font-weight: bold;
    font-size: $base-font-size-big;
    flex-shrink: 0;
  }
}
</style>
