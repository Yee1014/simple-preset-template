<template>
  <div class="base-list">
    <van-pull-refresh
      v-model="isRefreshing"
      :loading-text="$t('text.loadMore')"
      :disabled="!pullDownRefresh"
      @refresh="onRefresh"
    >
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :loading-text="$t('text.loadMore')"
        :offset="100"
        finished-text=""
        @load="onLoadMore"
      >
        <slot name="default">
          <van-empty
            v-if="!loading"
            class="base-list__empty"
            image="search"
            :description="$t('text.emptyData')"
          />
        </slot>
        <slot name="loading" />
        <slot name="finished" />
        <slot name="error" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { showToast } from '@/components/common/Toast'
import { tI18n } from '@/plugins/i18n'

/**
 * BaseList
 * @author  Yee
 * @date    2021/5/22
 * @desc    基础数据流列表
 */
export default {
  name: 'BaseList',
  props: {
    // 上拉加载
    fetchList: {
      type: Function,
      default: null,
    },
    // 下拉刷新接口
    pullDownRefresh: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      // 加载中
      loading: false,
      // 加载完成
      finished: false,
      // 下拉刷新中
      isRefreshing: false,
      // 下次到底提示message
      noMore: false,
    }
  },
  methods: {
    /**
     * 异步请求加载
     */
    onLoadMore() {
      if (this.noMore) {
        this.loading = false
        this.finished = true
        showToast({
          message: tI18n('text.loadFinish'),
          // 防止滚动异常
          forbidClick: false,
        })
        return
      }
      const loadingEnd = () => {
        // 加载状态结束
        this.loading = false
      }

      const loadFinish = () => {
        // 没有更多了
        this.noMore = true
      }

      // 异步更新数据
      if (this.fetchList) {
        this.fetchList(loadingEnd, loadFinish)
      } else {
        this.loading = false
        this.finished = true
      }
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      const refreshEnd = () => {
        // 加载状态结束
        this.isRefreshing = false
        this.finished = false
        this.noMore = false
      }

      if (this.pullDownRefresh) {
        this.pullDownRefresh(refreshEnd)
      } else {
        refreshEnd()
      }
    },
    /**
     * 重置
     */
    resetList() {
      this.loading = true
      this.finished = false
      this.noMore = false
      this.onLoadMore()
    },
  },
}
</script>

<style scoped lang="scss">
.base-list {
  .base-list__empty {
    height: 80vh;
  }

  .base-list__finish {
    padding: 10px 0;
  }
}
</style>
