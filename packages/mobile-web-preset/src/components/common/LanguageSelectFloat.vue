<template>
  <div v-if="visible" class="language-select-float" @click="showLanguagePop()">
    <div class="truncate">
      {{ currentLanguageName }}
    </div>
    <BaseIcon class="select-icon" icon="iconjiantou_xia_xi" />
  </div>
  <van-popup v-if="visible" v-model:show="languageVisible" position="bottom">
    <van-picker
      :title="$t('placeholder.siteLanguage')"
      show-toolbar
      :columns="shopLanguageList"
      value-key="languageShowName"
      @cancel="languageVisible = false"
      @confirm="handleLanguageConfirm"
    />
  </van-popup>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { saveLocalesStorage } from '@/plugins/i18n'
import BaseIcon from '@/components/base/BaseIcon'
import { isMiniProgramEnv } from '@/utils/common'

/**
 * LanguageSelectFloat
 * @author  Yee
 * @date    2022/9/22
 * @desc    切换语言选择器
 */
export default defineComponent({
  name: 'LanguageSelectFloat',
  components: { BaseIcon },
  setup() {
    const store = useStore()
    const isMp = isMiniProgramEnv()
    const languageVisible = ref(false)
    const shopLanguageList = computed(
      () => store.getters['app/shopLanguageList']
    )
    const handleLanguageConfirm = item => {
      if (item.key === store.getters['app/currentLanguage']) return
      saveLocalesStorage(item.key)
      window.location.reload()
    }
    const showLanguagePop = () => {
      languageVisible.value = true
    }

    const currentLanguageName = computed(() => {
      const lang = shopLanguageList.value.find(
        i => i.key === store.getters['app/currentLanguage']
      )
      return lang ? lang.languageShowName : '-'
    })

    const visible = computed(() => {
      // 不在小程序中，且支持的语言数量大于1
      return shopLanguageList.value.length > 1 && !isMp
    })

    return {
      visible,
      currentLanguageName,
      shopLanguageList,
      languageVisible,
      handleLanguageConfirm,
      showLanguagePop,
    }
  },
})
</script>

<style scoped lang="scss">
.language-select-float {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  padding: 0 24px;
  max-width: 240px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 29px;
  color: var(--color-white);
  font-size: var(--font-size-small);
  height: 56px;
  display: flex;
  align-items: center;

  .select-icon {
    margin-left: 16px;
    font-size: 20px;
  }
}
</style>
