<template>
  <div class="inputFieldOuter">
    <div class="inputFieldControl">
      <input
        :id="id"
        class="inputField"
        :class="{ 'inputField-error': showError }"
        :style="{ fontSize: fontSizeMap.get(fontSize) }"
        :type="type"
        :pattern="type === 'number' ? '\\d*' : null"
        :inputmode="type === 'number' ? 'decimal' : 'text'"
        :name="name"
        :placeholder="placeholder"
        :step="step"
        :value="value"
        :autocomplete="autocomplete"
        @input="$emit('input', $event)"
      />
      <span class="message">{{ errorMessage }}</span>
    </div>
    <span v-if="unit" class="unit">{{ unit }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Rules = {
  [key: string]: {
    isValid: boolean
    message: string
  }
}
type SizeType = 'M' | 'S'
type FontSizeType = string

export default Vue.extend({
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    step: {
      type: Number,
      default: 0,
    },
    required: {
      type: Boolean,
      default: false,
    },
    spo2: {
      type: Boolean,
      default: false,
    },
    floatingPoint: {
      type: Boolean,
      default: false,
    },
    temperature: {
      type: Boolean,
      default: false,
    },
    pulse: {
      type: Boolean,
      default: false,
    },
    isNumber: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: String,
      default: 'M',
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    unit: {
      type: String,
      default: '',
    },
  },
  watch: {
    rules() {
      this.showError = this.hasErrors
    },
    value() {
      this.$emit('validate', !this.hasErrors)
    },
  },
  data(): {
    showError: boolean
    fontSizeMap: Map<SizeType, FontSizeType>
  } {
    return {
      showError: false,
      fontSizeMap: new Map([
        ['M', '20px'],
        ['S', '16px'],
      ]),
    }
  },
  computed: {
    rules(): Rules {
      return {
        required: {
          isValid: this.ruleRequired,
          message: '必須項目です',
        },
        floatingPoint: {
          isValid: this.ruleFloatingPoint,
          message: '小数点まで入力してください',
        },
        spo2: {
          isValid: this.ruleSpo2,
          message: '50から100までの整数で入力してください',
        },
        temperature: {
          isValid: this.ruleTemperature,
          message: '33度から45度までで入力してください',
        },
        pulse: {
          isValid: this.rulePulse,
          message: '50から400までの整数で入力してください',
        },
        isNumber: {
          isValid: this.ruleIsNumber,
          message: '負数でない整数を入力してください', // TODO: メッセージを確定させる
        },
      }
    },
    ruleRequired(): boolean {
      if (!this.required) return true
      return Boolean(this.value)
    },
    ruleFloatingPoint(): boolean {
      if (!this.floatingPoint) return true
      return this.value.match(/\d+\.\d/) != null
    },
    ruleSpo2(): boolean {
      if (!this.spo2) return true
      if (this.value.match(/[^\d]/) != null) return false
      return parseInt(this.value) >= 50 && parseInt(this.value) <= 100
    },
    ruleTemperature(): boolean {
      if (!this.temperature) return true
      if (this.value.match(/[^\d.]/) != null) return false
      return parseFloat(this.value) >= 33 && parseFloat(this.value) <= 45
    },
    rulePulse(): boolean {
      if (!this.pulse) return true
      if (this.value.match(/[^\d]/) != null) return false
      return parseInt(this.value) >= 50 && parseInt(this.value) <= 400
    },
    ruleIsNumber(): boolean {
      if (!this.isNumber) return true
      return this.value.match(/^\d+$/) != null
    },
    errorMessage(): string {
      if (!this.showError) return ''
      const key = Object.keys(this.rules).find(
        (key) => !this.rules[key].isValid,
      )
      if (!key) return ''
      return this.rules[key].message
    },
    hasErrors(): boolean {
      return Object.keys(this.rules).some(
        (key: string) => !this.rules[key].isValid,
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.inputFieldOuter {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.inputFieldControl {
  flex: 1 1 auto;
}
.inputField {
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid $gray-2;
  &:focus {
    outline-color: $primary;
  }
  &-error {
    border: 1px solid $error;
    &:focus {
      outline-color: $error;
    }
  }
  &::placeholder {
    color: $gray-2;
  }
}
.labelText {
  flex: 0 0 35%;
  font-size: 20px;
}
.message {
  display: block;
  color: $error;
  font-size: 14px;
  height: 14px;
}
.unit {
  font-size: 20px;
  padding-left: 8px;
  padding-bottom: 14px;
}
</style>
