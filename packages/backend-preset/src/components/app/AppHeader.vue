<template>
  <div class="app-header sticky top-0 z-10">
    <div class="inner-header flex items-center pr-4">
      <div class="flex-1 flex items-center">
        <el-button
          class="header-icon"
          type="text"
          icon="el-icon-house"
          circle
          @click="goHome"
        />
        <div class="text-2xl font-hairline">{{ currentModuleName }}</div>
      </div>
      <el-tag class="mx-2" v-if="getUserRoles">{{ getUserRoles }}</el-tag>
      <el-dropdown @command="handleDropCommand">
        <div class="login-user">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <div class="user-name">
            <el-button type="text">{{ getUserName }}</el-button>
            <em class="el-icon-arrow-down el-icon--right" />
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="fullscreen">
            <em class="el-icon-full-screen" />全屏
          </el-dropdown-item>
          <el-dropdown-item v-if="loginUser" command="logout">
            <em class="el-icon-files" /> 退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

import screenfull from 'screenfull'
import { jumpMainWebEntry } from '@/utils/common'
import { mapGetters } from 'vuex'

/**
 * AppHeader
 * @author  Yee
 * @date    2020/8/13
 * @desc
 */
export default {
  name: 'AppHeader',

  computed: {
    ...mapGetters('user', ['loginUser']),
    // 获取用户姓名
    getUserName () {
      return this.loginUser?.userName || '未登录'
    },
    // 获取当前角色
    getUserRoles () {
      if (!this.loginUser) {
        return ''
      }
      // 本项目对应的角色
      const roleMap = {
      }
      const roles = []
      // 当前拥有的权限
      let roleList = []
      roles.forEach(r => {
        if (this.loginUser.roles.includes(r)) {
          roleList.push(roleMap[r])
        }
      })
      return roleList.join(',')
    },
    // 当前模块名称
    currentModuleName () {
      return this.$route.meta.title || 'Project-Name'
    },
  },

  methods: {
    /**
     * 全屏
     */
    requestFullScreen () {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      } else {
        // Ignore or do something else
        console.log('无法全屏')
        this.$message.error('无法全屏')
      }
    },

    /**
     * 处理点击
     */
    handleDropCommand (e) {
      switch (e) {
        case 'fullscreen':
          this.requestFullScreen()
          break
        case 'logout':
          jumpMainWebEntry()
          break
      }
    },

    /**
     * 跳转到首页
     */
    goHome () {
      this.$router.push({ name: 'AppContact' })
    },
  },
}
</script>

<style scoped lang="scss">
.app-header {
  width: 100%;
  background-color: $base-title-color;
  border-bottom: $base-border-style;

  .inner-header {
    height: $base-header-height;

    .header-icon {
      font-size: 20px;
    }
  }

  .login-user {
    display: flex;
    align-items: center;
    cursor: pointer;

    .user-name {
      margin-left: 5px;
    }
  }
}
</style>
