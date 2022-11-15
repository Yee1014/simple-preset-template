<template>
  <div class="content">
    <img class="logo" src="@/static/logo.png" alt="" />
    <div class="text-area">
      <text class="title">{{ title }}</text>
    </div>
    <uni-badge text="1"></uni-badge>
    <uni-badge text="2" type="success"></uni-badge>
    <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello Uni app')
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
