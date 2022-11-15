<template>
  <div class="maintain">
    <img class="img" :src="maintainImg" alt="" />
    <div class="txt">{{ $t('message.maintain') }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getCDNUrl } from '@/utils/common'

/**
 * Maintain
 * @author  Yee
 * @date    2021/5/19
 * @desc    服务维护
 */

export default defineComponent({
  name: 'Maintain',
  setup() {
    const maintainImg = getCDNUrl('/service-maintenance.png')

    return {
      maintainImg,
    }
  },
})
</script>

<style scoped lang="scss">
.maintain {
  padding-top: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .img {
    width: 520px;
    height: 390px;
    object-fit: cover;
  }

  .txt {
    font-size: 30px;
    font-weight: bold;
    color: #a1abc2;
    line-height: 42px;
  }
}
</style>
