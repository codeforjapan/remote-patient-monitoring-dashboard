<template>
  <span :class="['statusText', { active: isActive }]">
    {{ text }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.statusText {
  font-weight: 600;
  color: $gray-2;
  &.active {
    color: $notice;
  }
}
</style>
