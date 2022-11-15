<template>
  <div class="float-bottom-action">
    <slot></slot>
  </div>
</template>

<script>
/**
 * FloatBottomAction
 * @author  Yee
 * @date    2021/5/13
 * @desc    底部悬浮栏
 */
export default {
  name: 'FloatBottomAction',
}
</script>

<style scoped lang="scss">
.float-bottom-action {
  position: fixed;
  padding: 16px 32px;
  left: 0;
  right: auto;
  bottom: 0;
  width: 100%;
  background: var(--bgcolor-app);
  box-sizing: border-box;
  box-shadow: 0 -2px 7px 0 var(--color-border);
  z-index: 3;
}
</style>
