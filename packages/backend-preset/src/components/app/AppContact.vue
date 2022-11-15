<template>
  <div class="app-contact">
    <el-card>
      <div class="font-bold text-lg mb-2">导航：</div>
      <ol class="list-decimal pl-4">
      </ol>
      <div class="my-4">如果有问题请联系管理员～😀</div>
    </el-card>
    <el-divider class="footer-divider"><span class="text-sm">Bower By Yee</span></el-divider>
  </div>
</template>

<script>

/**
 * AppContact
 * @author  Yee
 * @date    2020/12/14
 * @desc    联系说明
 */
export default {
  name: 'AppContact',
}
</script>

<style scoped lang="scss">
.footer-divider {
  /deep/ .el-divider__text {
    background-color: $base-background-color;
  }
}
</style>
