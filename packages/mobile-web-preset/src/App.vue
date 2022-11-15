<template>
  <div class="app">
    <router-view v-if="initState" v-slot="{ Component }">
      <keep-alive :include="['Home']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- 页面渲染前加载指示器 -->
    <div v-if="!initState" class="page-loading-spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppApi from '@/api/modules/AppApi'

/**
 * App
 */
export default {
  name: 'App',
  data() {
    return {
      // 初始化状态
      initState: false,
    }
  },
  computed: {
    ...mapGetters('app', ['siteInfo']),
  },
  created() {
    this.initSite()
  },
  methods: {
    /**
     * 初始化站点商铺
     * @return {Promise<void>}
     */
    async initSite() {
      const goMaintain = () => {
        this.initState = true
        this.$nextTick(() => {
          this.$router.replace({ name: 'Maintain' })
        })
      }
      try {
        // 公众号中转页面不需要加载数据 后面有空将这个部分再将initSite这逻辑抽离出去
        if (
          location.pathname ===
          `${process.env.VUE_APP_PUBLIC_PATH}/redirect-page`
        ) {
          this.initState = true
          return
        }
        // 没有店铺信息
        if (!this.siteInfo) {
          goMaintain()
        }
        // 试用/付费已过期
        if (this.siteInfo && this.siteInfo.isExpire) {
          goMaintain()
        }
        await AppApi.fetchKFCustomerConfig()
        this.initState = true
      } catch (e) {
        console.log(e)
        this.initState = true
        goMaintain()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app {
  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .page-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .page-loading-spinner > div {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 100%;
    background-color: #2772fd;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .page-loading-spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .page-loading-spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
}
</style>
