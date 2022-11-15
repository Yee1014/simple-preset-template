<template>
  <div class="app-menu sticky top-0 z-10">
    <div class="h-screen">
      <el-scrollbar
        :native="false"
        wrap-class="app-menu__wrap"
        view-class="inner-el-menu">
        <div class="app-menu__wrap">
          <el-menu
            :default-active="currentActive"
            unique-opened
            :collapse="isCollapse"
            @select="selectNav"
            class="inner-el-menu"
          >
            <img
              @click="isCollapse=!isCollapse"
              class="logo"
              alt="logo"
              src="@/assets/logo.png"
            >
            <app-nav-item :arr="asyncNavMenu" :collapse="isCollapse"></app-nav-item>
          </el-menu>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
/**
 * AppNav
 * @author  Yee
 * @date    2020/8/13
 * @desc
 */
import { mapGetters } from 'vuex'
import AppNavItem from './AppNavItem'

export default {
  name: 'AppNav',
  components: { AppNavItem },
  data () {
    return {
      navs: [],
      isCollapse: false,
    }
  },
  computed: {
    /**
     * 当前激活index
     * @return {string}
     */
    ...mapGetters('permission', ['asyncNavMenu']),
    currentActive () {
      return this.$route.name
    },
  },
  mounted () {
    // this.handleSetNavs()
  },
  methods: {
    /**
     * 当前选中的路由 name 跳转
     */
    selectNav (name) {
      this.$router.push(
        { name },
        (onComplete) => {
        },
        (onAbort) => {
        },
      )
    },
    /**
     * 根据路由设置侧边栏
     */
    handleSetNavs () {
      let curItem = this.asyncNavMenu.find((i) => i.name === 'Dashboard')
      this.navs = curItem.children
    },
  },
}
</script>

<style scoped lang="scss">
.app-menu {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  background: $base-menu-background;
  height: 100%;

  ::v-deep .el-menu--collapse {
    .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }
  }

  .inner-el-menu {
    border-right: none;

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .logo {
    margin: auto;
    width: 100px;
    display: block;
  }

  /deep/ .el-menu-item.is-active {
    background-color: $base-color-default;
    color: $base-color-white;
  }

  .app-menu__wrap {
    max-height: 100vh !important;
  }

  .app-menu__list {
    list-style: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
}
</style>
