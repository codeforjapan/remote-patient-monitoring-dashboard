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
  display: block;
  font-size: 12px;
  font-weight: bold;
  color: $white;
  text-align: center;
  padding: 4px 8px;
  margin: 6px;
  border-radius: 3em;
  background-color: $primary;
  &.active {
    background-color: $error;
  }
}
</style>
