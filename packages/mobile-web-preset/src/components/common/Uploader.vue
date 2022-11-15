<template>
  <van-uploader
    ref="Uploader"
    v-model="fileList"
    class="upload-img"
    :class="{ 'size-small': smallCard }"
    :before-read="beforeRead"
    :after-read="handleAfterRead"
    :before-delete="handleBeforeDelete"
    image-fit="contain"
    :max-count="maxCount"
    @delete="handleDelete"
  >
    <div v-show="fileList.length < maxCount" class="upload-wrap">
      <BaseIcon class="upload-plus" icon="iconxinzeng" />
    </div>
  </van-uploader>
</template>

<script>
import { NAS_IMG_URL } from '@/utils/appConstant'
import BaseIcon from '@/components/base/BaseIcon'
import BaseDataApi from '@/api/modules/BaseDataApi'
import { defineComponent, onMounted, ref } from 'vue'

/**
 * Uploader
 * @author  Yee
 * @date    2021/6/4
 * @desc    上传组件
 */
export default defineComponent({
  name: 'Uploader',
  components: { BaseIcon },
  props: {
    maxCount: {
      type: Number,
      default: 1,
    },
    smallCard: {
      type: Boolean,
      default: false,
    },
    model: {
      type: Array,
      default: () => null,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const fileList = ref([])

    onMounted(() => {
      if (props.model) {
        props.model.forEach(item => {
          fileList.value.push({ url: item, isImage: true })
        })
      }
    })

    /**
     * 文件可上传
     * @param file
     * @param detail
     */
    const handleAfterRead = (file, detail) => {
      // uploading 表示上传中，failed 表示上传失败，done 表示上传完成
      file.status = 'uploading'
      file.message = ''
      file.imageFit = 'contain'

      // 上传参数
      const uploadForm = {
        // downloadFileName: name,
        multipartFile: file.file,
      }

      BaseDataApi.uploadFile(uploadForm)
        .then(res => {
          const { code, data } = res
          if (code === 200) {
            file.url = `https:${NAS_IMG_URL}${data}`
            emit('change', {
              value: `https:${NAS_IMG_URL}${data}`,
              file,
              fileList: fileList.value,
            })
            file.status = 'done'
          } else {
            file.status = 'failed'
          }
        })
        .catch(() => {
          file.status = 'failed'
        })
    }

    /**
     * 上传前的回调
     * @param file
     * @return {boolean}
     */
    const beforeRead = file => {
      // 可能需要判断文件大小
      return true
    }

    /**
     * 删除前回调
     * @param file
     * @param detail
     */
    const handleBeforeDelete = (file, detail) => {
      return true
    }

    /**
     * 删除回调
     * @param file
     * @param detail
     */
    const handleDelete = (file, detail) => {
      emit('change', { value: '', file, fileList: fileList.value })
    }

    /**
     * 重置
     */
    const reset = () => {
      fileList.value = []
      emit('change', { value: '', file: null, fileList: fileList.value })
    }

    return {
      fileList,
      handleAfterRead,
      beforeRead,
      handleBeforeDelete,
      handleDelete,
      reset,
    }
  },
})
</script>

<style scoped lang="scss">
.upload-img {
  &.size-small {
    &::v-deep(.van-uploader__preview) {
      .van-uploader__preview-image {
        width: 120px;
        height: 120px;
      }
    }

    .upload-wrap {
      width: 120px;
      height: 120px;
      line-height: 120px;

      .upload-plus {
        font-size: 36px;
        font-weight: lighter;
      }
    }
  }

  &::v-deep(.van-uploader__preview) {
    margin: 0 20px 0 0;
    background: #f8f8fa;
    border-radius: 4px;
    border: 1px solid #e1e5ed;

    &:last-child {
      margin: 0;
    }

    .van-uploader__preview-image {
      width: 200px;
      height: 200px;
    }

    .van-uploader__preview-delete {
      width: 40px;
      height: 40px;
      border-radius: 0;
      background: rgba(#000, 0.3);
      overflow: hidden;

      .van-uploader__preview-delete-icon {
        top: 5px;
        left: 0;
        font-size: 28px;
        text-align: center;
        transform: scale(1);
      }
    }
  }

  .upload-wrap {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border-radius: 4px;
    background: #f6f7fc;
    border: 2px dashed #e4e5e9;

    .upload-plus {
      margin: 0 auto;
      font-size: 48px;
      font-weight: lighter;
      color: var(--color-gray-3);
    }
  }

  .preview-cover {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    background: rgba(0, 0, 0, 0.4);

    .inner-delete {
      font-size: 50px;
      color: var(--color-gray-2);
    }
  }
}
</style>
