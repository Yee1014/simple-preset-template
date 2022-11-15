<template>
  <div>
    <template v-for="(nav) in arr">
      <template v-if="!nav.hidden">
        <el-submenu
          v-if="nav.children"
          :index="nav.name"
          :key="nav.name"
        >
          <template slot="title">
            <em v-if="nav.meta.icon" :class="nav.meta.icon"></em>
            <span slot="title" v-show="!collapse">{{ nav.title }}</span>
          </template>
          <app-nav-item :arr="nav.children"></app-nav-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="nav.name"
          :key="nav.name"
        >
          <em v-if="nav.meta.icon" :class="nav.meta.icon"></em>
          <template slot="title">
            <span>{{ nav.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
/**
 * @description: 侧边栏menu-item组件
 * @param {type}
 * @return {type} null
 */
export default {
  name: 'AppNavItem',
  props: {
    arr: {
      type: Array,
      default: () => [],
    },

    // 是否折叠
    collapse: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
