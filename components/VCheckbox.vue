<template>
  <div>
    <input
      :id="name"
      class="checkbox"
      type="checkbox"
      :checked="checked"
      :value="value"
      @input="$emit('input', $event.target.checked, $event.target.value)"
    />
    <label :for="name" class="label">
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'checked',
    event: 'input',
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.checkbox {
  display: none;
  ~ .label {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    &::before {
      position: absolute;
      left: 5px;
      border: 1px solid $gray-2;
      border-radius: 3px;
      content: '';
      display: block;
      height: 18px;
      width: 18px;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 11px;
      border-right: 3px solid $primary;
      border-bottom: 3px solid $primary;
      content: '';
      display: block;
      width: 6px;
      height: 12px;
      margin-top: -7px;
      transform: rotate(45deg);
      opacity: 0;
    }
  }
  &:checked + label::after {
    opacity: 1;
  }
}
</style>
