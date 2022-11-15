<template>
  <footer class="app-footer">
    <div>{{ $t('appFooter.TechnicalSupport') }}</div>
  </footer>
</template>

<script>
/**
 * AppFooter
 * @author  Yee
 * @date    2021/5/19
 * @desc    企业技术说明
 */
export default {
  name: 'AppFooter',
}
</script>

<style scoped lang="scss">
.app-footer {
  padding-top: 40px;
  padding-bottom: 20px;
  font-size: 24px;
  color: #828486;
  line-height: 38px;
  text-align: center;
}
</style>
