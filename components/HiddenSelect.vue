<template>
  <div class="selectContainer">
    <select class="select" :value="value" @input="handleInput">
      <option v-for="(item, index) in items" :key="index" :value="item.slug">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      items: [
        {
          slug: 'show-only-display-true',
          text: '非表示患者を表示しない',
        },
        {
          slug: 'show-only-display-false',
          text: '非表示患者のみ表示する',
        },
      ],
    }
  },
  methods: {
    handleInput(event: Event) {
      const target = event.target as HTMLSelectElement
      const value =
        target && target.selectedOptions.length
          ? target.selectedOptions[0].value
          : ''

      this.$emit('input', value)
      this.$emit('selected', value)
    },
  },
})
</script>

<style lang="scss" scoped>
.selectContainer {
  width: calc(100% - 48% - 18.2% - 32px - 16px);
  margin-left: 16px;
  position: relative;
  border-radius: 10px;
  background-color: $white;
  &::before {
    position: absolute;
    top: 50%;
    right: 0.8em;
    margin-top: -2px;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid $gray-3;
    pointer-events: none;
  }
}
.select {
  width: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  appearance: none;
  font-size: 16px;
  padding: 12px 38px 12px 12px;
}
</style>
