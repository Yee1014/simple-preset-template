<template>
  <div class="home">
    <AppNav class="app-nav" />
    <main class="app-main">
      <AppHeader />
      <Layout>
        <router-view />
      </Layout>
    </main>
  </div>
</template>

<script>
import AppNav from '@/components/app/AppNav'
import AppHeader from '@/components/app/AppHeader'
import Layout from '@/views/Layout'
import { mapActions } from 'vuex'

/**
 * Home
 */
export default {
  name: 'Dashboard',
  components: {
    Layout,
    AppHeader,
    AppNav,
  },

  created () {
  },

  methods: {
    ...mapActions(
      'app',
      [],
    ),
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  .app-nav {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .app-main {
    flex: 1 auto;
    width: calc(100% - 200px);
  }
}
</style>
