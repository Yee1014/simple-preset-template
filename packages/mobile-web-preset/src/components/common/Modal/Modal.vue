<template>
  <BaseDialog v-model:visible="visible" :title="title" @close="doClose">
    <div class="modal-body">
      <div class="modal-message">{{ message }}</div>
    </div>
    <template #footer>
      <div class="modal-footer">
        <BaseButton
          v-if="showCancelButton"
          class="cancel-button"
          plain
          type="info"
          rounded
          @click="handleButtonClick(false)"
        >
          {{ cancelButtonText }}
        </BaseButton>
        <BaseButton
          v-if="showConfirmButton"
          :type="confirmButtonType"
          class="confirm-button"
          rounded
          @click="handleButtonClick(true)"
        >
          {{ confirmButtonText }}
        </BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/base/BaseDialog'
import BaseButton from '@/components/base/BaseButton'

/**
 * Modal
 * @author  Yee
 * @date    2021/5/13
 * @desc    Modal视图
 */
export default {
  name: 'Modal',
  components: { BaseButton, BaseDialog },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (this.visible) {
      this.visible = false
    }
    next()
  },
  data() {
    return {
      visible: false,
      message: '',
      title: '',
      confirmButtonText: '',
      confirmButtonType: 'default',
      cancelButtonText: '',
      showCancelButton: true,
      showConfirmButton: true,
      onConfirm: null,
      onCancel: null,
      // 点击回调
      clickEvent: null,
      // 最终回调
      callback: null,
      modalId: null,
    }
  },
  methods: {
    /**
     * 按钮点击
     * @param isConfirm 主要按钮|次要按钮
     */
    handleButtonClick(isConfirm) {
      this.clickEvent = isConfirm ? this.onConfirm : this.onCancel
      this.visible = false
    },
    /**
     * 监听关闭
     */
    doClose() {
      if (this.clickEvent) {
        this.clickEvent()
      }
      this.callback && this.callback(this.modalId)
    },
  },
}
</script>

<style scoped lang="scss">
.modal-header {
  min-height: 35px;
}

.modal-body {
  //padding-top: 35px;
}

.modal-message {
  text-align: center;
  font-size: var(--font-size-lg);
  color: var(--color-black);
}

.modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;

  .cancel-button,
  .confirm-button {
    margin: 0 15px;
    width: 248px;
  }
}
</style>
