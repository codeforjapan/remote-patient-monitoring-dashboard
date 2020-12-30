<template>
  <label class="inputFieldContainer">
    <span class="labelText">{{ label }}</span>
    <input
      class="inputField"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.inputFieldContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}
.inputField {
  flex: 0 0 48%;
  font-size: 16px;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid $gray-2;
  &:focus {
    outline-color: $primary;
  }
  &:invalid:not(:focus) {
    border: 2px solid $error;
  }
}
.labelText {
  font-size: 24px;
  font-weight: bold;
}
</style>
