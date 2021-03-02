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
          slug: 'latest',
          text: '開始日が早い順',
        },
        {
          slug: 'tmp-latest', // たぶん、これが 'latest' なのでは?
          text: '開始日が遅い順',
        },
        {
          slug: 'severity',
          text: 'SpO2が低い順',
        },
        {
          slug: 'reporting-latest',
          text: '最新更新日順',
        },
        {
          slug: 'remark-latest',
          text: '備考記録日順',
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
  width: 18.2%;
  margin-left: 32px;
  position: relative;
  border-radius: 10px;
  background-color: $white;
  text-indent: 2rem;
  &::before {
    position: absolute;
    top: 30%;
    left: 0.8em;
    content: '';
    width: 17px;
    height: 15px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12"><path fill="%23C5C7CD" d="M0.128568 2.26839L2.31563 0.125478C2.48647 -0.0418526 2.7636 -0.0417991 2.93434 0.125478L5.12132 2.26839C5.39667 2.53812 5.20059 3.00001 4.81195 3.00001H3.5V11.5714C3.5 11.8081 3.30414 12 3.0625 12H2.1875C1.94586 12 1.75 11.8081 1.75 11.5714V3.00001H0.437935C0.0485329 3.00001 -0.146209 2.53758 0.128568 2.26839ZM6.5625 1.7143H13.5625C13.8041 1.7143 14 1.52243 14 1.28573V0.428584C14 0.191879 13.8041 1.34454e-05 13.5625 1.34454e-05H6.5625C6.32086 1.34454e-05 6.125 0.191879 6.125 0.428584V1.28573C6.125 1.52243 6.32086 1.7143 6.5625 1.7143ZM6.125 4.71429V3.85715C6.125 3.62045 6.32086 3.42858 6.5625 3.42858H11.8125C12.0541 3.42858 12.25 3.62045 12.25 3.85715V4.71429C12.25 4.951 12.0541 5.14287 11.8125 5.14287H6.5625C6.32086 5.14287 6.125 4.951 6.125 4.71429ZM6.125 11.5714V10.7143C6.125 10.4776 6.32086 10.2857 6.5625 10.2857H8.3125C8.55414 10.2857 8.75 10.4776 8.75 10.7143V11.5714C8.75 11.8081 8.55414 12 8.3125 12H6.5625C6.32086 12 6.125 11.8081 6.125 11.5714ZM6.125 8.14286V7.28572C6.125 7.04901 6.32086 6.85715 6.5625 6.85715H10.0625C10.3041 6.85715 10.5 7.04901 10.5 7.28572V8.14286C10.5 8.37957 10.3041 8.57143 10.0625 8.57143H6.5625C6.32086 8.57143 6.125 8.37957 6.125 8.14286Z" /></svg> ');
    background-size: contain;
    vertical-align: middle;
  }
  &::after {
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
