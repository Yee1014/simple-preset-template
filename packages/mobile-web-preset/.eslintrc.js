module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  rules: {
    'vue/require-explicit-emits': 'off',
    'vue/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    WeixinJSBridge: true,
    wx: true,
    _hmt: true,
    uni: true,
    TencentCaptcha: true,
    // vue3
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
