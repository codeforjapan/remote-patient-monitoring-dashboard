<template>
  <span :class="['symptomsText', { active: isActive }]">
    {{ text }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.symptomsText {
  font-size: 14px;
  font-weight: bold;
  color: $gray-3;
  &.active {
    color: $notice;
  }
}
</style>
