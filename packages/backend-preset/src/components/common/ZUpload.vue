<template>
  <el-upload
    :action="actionUrl"
    name="multipartFile"
    with-credentials
    :data="uploadForm"
    :headers="{appName: ''}"
    :before-upload="handleBeforeUpload"
    :on-error="handleUploadError"
    v-bind="$attrs"
    v-on="parentListeners">
    <slot>
      <em class="el-icon-plus"></em>
    </slot>
  </el-upload>
</template>

<script>
import { APP_VAR } from '@/utils/appConstant'

/**
 * ZUpload
 * @author  Yee
 * @date    2020/8/22
 * @desc    公共封装上传组件
 */
export default {
  name: 'ZUpload',

  props: {
    // 标记(可以是用户id或对应的企业id，等其他)
    relevanceId: {
      type: [String, Number],
      default: 0,
    },
  },

  computed: {
    // 所有父级事件
    parentListeners () {
      // const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {},
      )
    },
  },

  data () {
    return {
      // 上传地址
      actionUrl: APP_VAR.NAS_UPLOAD_URL,
      // 上传参数
      uploadForm: {
        type: '',
        relevanceId: '',
        downloadFileName: '',
      },
    }
  },

  watch: {
    relevanceId (newValue) {
      this.uploadForm.relevanceId = newValue
    },
  },

  created () {
    this.uploadForm.relevanceId = this.relevanceId
  },

  methods: {
    /**
     * 上传前
     * @param file
     * @return {boolean}
     */
    handleBeforeUpload (file) {
      if (!this.uploadForm.relevanceId) {
        this.$message.error('缺少上传必要参数！')
        return false
      }
      const validFileLength = file.name.length <= 20
      if (!validFileLength) {
        this.$message.error(`${file.name}文件名过长！[${file.name.length}]`)
        return false
      }
      this.uploadForm.downloadFileName = file.name
      // 最大2mb
      const isLtSize = file.size / 1024 / 1024 < 2
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      return true
    },

    /**
     * 文件上传失败时的钩子
     * @param err
     * @param file
     * @param fileList
     */
    handleUploadError (err, file, fileList) {
      const error = JSON.parse(err.message)
      this.$message.error(error.message)
    },
  },
}
</script>

<style scoped lang="scss">

</style>
