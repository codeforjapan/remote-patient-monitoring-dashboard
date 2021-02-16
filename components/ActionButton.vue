<template>
  <component
    :is="tag"
    :to="to"
    :class="['actionButton', `actionButton-${theme}`, { inline: isInline }]"
    :style="{ fontSize: fontSizeMap.get(size) }"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

type ThemeType = 'primary' | 'error' | 'disable' | 'outline' | 'text'
type SizeType = 'L' | 'M' | 'S'
type FontSizeType = string

@Component
export default class ActionButton extends Vue {
  fontSizeMap: Map<SizeType, FontSizeType> = new Map([
    ['L', '24px'],
    ['M', '16px'],
    ['S', '12px'],
  ])

  @Prop({ default: false })
  isInline!: boolean

  @Prop({ default: 'primary' })
  theme!: ThemeType

  @Prop({ default: 'L' })
  size!: SizeType

  @Prop({ default: '' })
  to?: string

  get tag() {
    return this.to ? 'router-link' : 'button'
  }
}
</script>

<style lang="scss" scoped>
.actionButton {
  display: inline-block;
  width: 100%;
  font-weight: bold;
  padding: 0.8em 1em;
  border-radius: 0.5em;
  border: none;
  color: $white;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  svg {
    fill: currentColor;
  }
  &.inline {
    width: auto;
  }
  &-primary {
    background-color: $primary;
  }
  &-error {
    background-color: $error;
  }
  &-disable {
    background-color: $gray-1;
  }
  &-outline {
    background-color: $white;
    color: $primary;
    border: 2px solid currentColor;
  }
  &-text {
    background-color: transparent;
    color: inherit;
  }
  &:focus {
    opacity: 0.7;
    outline: dotted $gray-2 1px;
  }
}
</style>
