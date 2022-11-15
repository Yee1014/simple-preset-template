<template>
  <ul class="timeline">
    <li v-for="(v, i) in activities" :key="i" class="timeline-item">
      <div class="timeline-item__line" />
      <div class="timeline-item__node--default" :class=" {'timeline-item__node--active':i===0}" />
      <div class="timeline-item__content">
        <slot v-bind="{row:v,$index:i}">
          <div>{{ v }}</div>
        </slot>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    activities: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>

<style scoped lang="scss">
.timeline {
  @apply m-0 list-none;
  &-item {
    @apply relative;
    padding-bottom: 20px;

    &__line {
      @apply absolute h-full border-l;
      border-color: #CCCCCC;
      left: 7px;
    }

    &__node {
      &--default {
        @apply flex justify-center items-center absolute;
        border-radius: 50%;
        background: #CCCCCC;
        left: 3px;
        width: 8px;
        height: 8px;
      }

      &--active {
        @apply flex justify-center relative items-center absolute left-0;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #5572FD;
        width: 16px;
        height: 16px;

        &::after {
          content: '';
          @apply absolute;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #5572FD;
          width: 8px;
          height: 8px;
        }
      }
    }

    &__content {
      position: relative;
      padding-left: 28px;
      top: -3px;
    }

    &:last-child {
      .timeline-item__line {
        display: none;
      }
    }
  }
}
</style>
