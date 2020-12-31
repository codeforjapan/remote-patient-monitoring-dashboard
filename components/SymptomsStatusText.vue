<template>
  <span :class="['statusText', { active: isActive }]">
    {{ isActive ? 'あり' : 'なし' }}
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
  },
})
</script>

<style lang="scss" scoped>
.statusText {
  font-weight: bold;
  color: $link;
  &.active {
    color: $error;
  }
}
</style>
