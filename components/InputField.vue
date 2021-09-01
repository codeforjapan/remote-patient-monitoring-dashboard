<template>
  <div>
    <label class="inputFieldContainer">
      <span class="labelText">{{ label }}</span>
      <input
        :class="['inputField', { 'inputField-error': showError }]"
        :style="{ fontSize: fontSizeMap.get(fontSize) }"
        :type="definedType"
        :pattern="type === 'number' ? '\\d*' : null"
        :name="name"
        :placeholder="placeholder"
        :step="step"
        :value="value"
        :autocomplete="autocomplete"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"
      />
      <div v-if="type === 'password'" class="showIcon">
        <EyeIcon
          v-if="definedType === 'password'"
          @click="handleShowPassword(true)"
        />
        <EyeOffIcon v-else @click="handleShowPassword(false)" />
      </div>
    </label>
    <span class="message">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EyeIcon from '@/static/icon-eye.svg'
import EyeOffIcon from '@/static/icon-eye-off.svg'

type Rules = {
  [key: string]: {
    isValid: boolean
    message: string
  }
}
type SizeType = 'M' | 'S'
type FontSizeType = string

export default Vue.extend({
  components: {
    EyeIcon,
    EyeOffIcon,
  },
  props: {
    label: {
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
    fontSize: {
      type: String,
      default: 'M',
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: '',
    },
    ruleLength: {
      type: Number,
      default: 0,
    },
  },
  data(): {
    showError: boolean
    showPassword: boolean
    fontSizeMap: Map<SizeType, FontSizeType>
  } {
    return {
      showError: false,
      showPassword: false,
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
          message: '必須項目です', // TODO: メッセージを確定させる
        },
        length: {
          isValid: this.value.length >= this.ruleLength,
          message: `${this.ruleLength}文字以上必要です`, // TODO: メッセージを確定させる
        },
      }
    },
    ruleRequired(): boolean {
      if (!this.required) return true
      return Boolean(this.value)
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
    definedType(): string {
      if (this.type === 'password') {
        if (this.showPassword) {
          return 'text'
        } else {
          return 'password'
        }
      } else {
        return this.type
      }
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
  methods: {
    handleShowPassword(bool: boolean): void {
      this.showPassword = bool
    },
  },
})
</script>

<style lang="scss" scoped>
.inputFieldContainer {
  position: relative;
  padding: 12px 0;
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
  display: block;
  margin: 0 0 8px;
  font-size: 16px;
}
.message {
  display: block;
  color: $error;
  font-size: 14px;
  height: 14px;
}
.showIcon {
  position: absolute;
  bottom: 4px;
  right: 8px;
  svg {
    fill: $gray-3;
  }
}
</style>
