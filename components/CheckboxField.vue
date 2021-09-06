<template>
  <label
    :class="[
      'checkboxContainer',
      isFocused ? 'focused' : '',
      isChecked ? 'selected' : '',
    ]"
  >
    <input
      type="checkbox"
      class="checkbox"
      tabindex="0"
      :name="name"
      :checked="checked"
      :value="value"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @input="onCheck"
    />
    <span class="label">{{ label }}</span>
  </label>
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
    label: {
      type: String,
      default: '',
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
  data(): {
    isFocus: boolean
    isChecked: boolean
  } {
    return {
      isFocus: false,
      isChecked: false,
    }
  },
  computed: {
    isFocused(): boolean {
      return this.isFocus
    },
    handleIsChecked: {
      get(): boolean {
        return this.isChecked
      },
      set(newValue: boolean) {
        this.isChecked = newValue
      },
    },
  },
  methods: {
    onCheck($event: { target: { checked: boolean; value: string } }) {
      this.$emit('input', $event.target.checked, $event.target.value)
      this.isChecked = $event.target.checked
    },
  },
})
</script>

<style lang="scss" scoped>
.checkboxContainer {
  position: relative;
  display: block;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid $gray-2;
  cursor: pointer;
  &.focused {
    border: none;
    box-shadow: 0 0 0 2px #05a;
  }
  &.selected {
    background-color: rgba($secondary, 0.25);
    border-color: $secondary;
  }
}

.label {
  position: absolute;
  top: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &::before {
    display: block;
    border: 1px solid $gray-2;
    border-radius: 50%;
    content: '';
    height: 20px;
    width: 20px;
    margin-right: 8px;
  }
}

.checkbox:checked + .label {
  &::before {
    border-color: $secondary;
    background-color: $secondary;
  }
  &::after {
    position: absolute;
    top: 12px;
    left: 7px;
    border-right: 2px solid $white;
    border-bottom: 2px solid $white;
    content: '';
    display: block;
    width: 6px;
    height: 12px;
    margin-top: -7px;
    transform: rotate(45deg);
  }
}

.checkbox {
  opacity: 0;
}
</style>
