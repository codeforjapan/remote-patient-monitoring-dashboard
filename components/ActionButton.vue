<template>
  <button
    :class="`actionButton actionButton-${theme}`"
    :style="{ fontSize: fontSizeMap.get(size) }"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

type ThemeType = 'primary' | 'error'
type SizeType = 'L' | 'M' | 'S'
type FontSizeType = string

@Component
export default class ActionButton extends Vue {
  fontSizeMap: Map<SizeType, FontSizeType> = new Map([
    ['L', '24px'],
    ['M', '16px'],
    ['S', '12px'],
  ])

  @Prop({ default: 'primary' })
  theme!: ThemeType

  @Prop({ default: '' })
  text!: string

  @Prop({ default: 'L' })
  size!: SizeType
}
</script>

<style lang="scss" scoped>
.actionButton {
  font-weight: bold;
  padding: 0.8em 3em;
  border-radius: 0.5em;
  border: none;
  color: $white;
  cursor: pointer;
  &-primary {
    background-color: $primary;
  }
  &-error {
    background-color: $error;
  }
  &:focus {
    opacity: 0.7;
    outline: dotted $gray-2 1px;
  }
}
</style>
