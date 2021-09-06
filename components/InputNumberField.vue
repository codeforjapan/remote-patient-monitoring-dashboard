<template>
  <validation-provider :name="name" :rules="rules" tag="div">
    <label :for="id" class="labelText">{{ label }}</label>
    <VInputField
      :id="id"
      type="number"
      :name="name"
      :placeholder="placeholder"
      :step="step"
      :value="value"
      :unit="unit"
      :required="required"
      :floating-point="floatingPoint"
      :pulse="pulse"
      :temperature="temperature"
      :spo2="spo2"
      @input="$emit('input', $event.target.value)"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VInputField from '@/components/VInputField.vue'
@Component({
  components: {
    VInputField,
  },
})
export default class InputNumberField extends Vue {
  @Prop({ type: String, default: '' })
  id: string | undefined

  @Prop({ type: String, default: '' })
  rules: string | undefined

  @Prop({ type: String, default: 0 })
  value: string | undefined

  @Prop({ type: String, default: '' })
  label: string | undefined

  @Prop({ type: String, default: '' })
  name: string | undefined

  @Prop({ type: String, default: '' })
  placeholder: string | undefined

  @Prop({ type: String, default: '' })
  unit: string | undefined

  @Prop({ type: Number, default: 0 })
  step: number | undefined

  @Prop({ type: Boolean, default: false })
  required: boolean | undefined

  @Prop({ type: Boolean, default: false })
  floatingPoint: boolean | undefined

  @Prop({ type: Boolean, default: false })
  pulse: boolean | undefined

  @Prop({ type: Boolean, default: false })
  temperature: boolean | undefined

  @Prop({ type: Boolean, default: false })
  spo2: boolean | undefined
}
</script>

<style lang="scss" scoped>
.labelText {
  display: block;
  margin: 0 0 8px;
  font-size: 16px;
}
</style>
