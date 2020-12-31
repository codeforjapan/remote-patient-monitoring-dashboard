<template>
  <input
    class="searchField"
    type="search"
    placeholder="Search"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.searchField {
  width: 300px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: $bg-gray url('~static/icon-search.png') no-repeat scroll 12px 12px;
  text-indent: 20px;
}
</style>
