/**
 * quilljs
 * @author  Yee
 * @date    2020/8/13
 * @desc    富文本编辑器
 * @link    https://github.com/surmon-china/vue-quill-editor
 */

import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

const editorOption = {
    // placeholder: '最多支持录入200个字符',
    theme: 'snow',
    modules: {
        toolbar: {
            container: [
                ['bold'],
                [{ color: [] }, { background: [] }],
            ], // 工具栏选项
        },
    },
}

Vue.use(VueQuillEditor, editorOption)
