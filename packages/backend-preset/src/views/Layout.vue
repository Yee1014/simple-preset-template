<template>
  <div class="app-layout">
    <slot />
  </div>
</template>

<script>

/**
 * Layout
 * @author  Yee
 * @date    2020/8/13
 * @desc
 */
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.app-layout {
  padding: $base-padding;
}
</style>
