<template>
  <div class="blog-page">
    <nuxt-link to="/">Back</nuxt-link>
  </div>
</template>

<script>
/**
 * blog
 * @author  Yee
 * @date    2020/6/11
 * @desc
 */
export default {
  layout: 'bHeader',
  name: 'Blog'
}
</script>

<style scoped lang="scss">
.blog-page {
  margin: 0 auto;
  padding: 20px;
  width: 800px;
  min-height: 100vh;
  background: rgba(59, 128, 112, 0.29);
  box-shadow: 0 0 4px 1px rgb(45, 73, 69);
}
</style>
