<template>
  <div class="about">
    <img class="flex-shrink-0" src="@/assets/images/developer.gif" alt="developer">
    <div class="perspective-wrapper">
      <div class="star-war-text text-gray-500 font-light" id="StarWarWord">
        <div style="height: 100%"></div>
        <div style="height: 60%"></div>
        <div>Thanks 😘</div>
        <div style="height: 40%"></div>
      </div>
    </div>
  </div>
</template>

<script>

import { tweenAnimation } from '@/utils/common';

export default {
  name: 'About',

  mounted () {
    this.showCast()
  },

  methods: {
    /**
     * 展示幕布
     */
    showCast () {
      const StarWarWord = document.getElementById('StarWarWord')
      const scrollHeight = StarWarWord.scrollHeight
      tweenAnimation(0, scrollHeight, StarWarWord, 60000)
    },
  },
}

</script>

<style scoped lang="scss">
.about {
  width: 100%;
  height: 100vh;
  background: white;
  overflow: hidden;

  img {
    margin: 0 auto;
  }
}

.perspective-wrapper {
  perspective: 400px;
  height: calc(100vh - 500px);

  .star-war-text {
    transform: rotateX(22deg) translateZ(calc(18vh));
    height: 88%;
    overflow-y: scroll;
    letter-spacing: 1.6px;
    line-height: 2rem;
    text-align: center;
  }
}

</style>
