<template>
  <button class="iconActionButton" @click="$emit('click')">
    <span>
      <svg class="iconSvg" :is="icon" aria-hidden="true" />
    </span>
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import SortIcon from '@/static/icon-sort.svg'
import FilterIcon from '@/static/icon-filter.svg'

export default Vue.extend({
  components: {
    SortIcon,
    FilterIcon,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.iconActionButton {
  border: none;
  background: none;
  font-size: 14px;
}
.iconSvg {
  fill: $gray-3;
}
</style>
