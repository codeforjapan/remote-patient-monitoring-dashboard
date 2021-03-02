<template>
  <input
    class="searchField"
    type="search"
    placeholder="検索"
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
  width: 48%;
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  background: $white url('../static/icon-search.png') no-repeat scroll 16px 12px;
  text-indent: 30px;
  font-size: 16px;
}
</style>
