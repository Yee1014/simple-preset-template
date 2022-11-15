<template>
  <div class="page-not-found">
    <p>404</p>
    <p>{{ $t('message.notFoundPage') }}</p>
    <van-empty />
  </div>
</template>

<script>
/**
 * 404
 * @author  Yee
 * @date    2021/5/10
 * @desc    找不到页面
 */
export default {
  name: 'Page404',

  mounted() {
    document.title = '404'
  },
}
</script>

<style scoped lang="scss">
.page-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
</style>
