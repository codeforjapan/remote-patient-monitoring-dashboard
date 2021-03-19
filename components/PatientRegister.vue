<template>
  <div>
    <h2>新規患者を登録する</h2>
    <p>
      入力された電話番号にショートメッセージにてログイン用のURLを送ります。<br />
      受信者に通信料金がかかる場合があります。
    </p>
    <div class="inputContainer">
      <InputField
        v-model="inputMobileTel"
        label="携帯電話番号"
        name="mobileTel"
        required
        rules="required"
        @input="$emit('input-tel', $event)"
      />
    </div>
    <div class="inputContainer">
      <InputField v-model="inputMemo" label="メモ（任意）" name="memo" />
    </div>
    <div class="inputContainer">
      <VCheckbox v-model="checkSendSMS" name="sendSMS">
        患者にSMSを送信する
      </VCheckbox>
    </div>
    <ActionButton
      type="submit"
      :theme="btnTheme"
      size="L"
      :is-submittable="isSubmittable"
      :is-processing="isProcessing"
      @click="
        $emit('click-register', {
          mobileTel: inputMobileTel,
          memo: inputMemo,
          sendSMS: checkSendSMS,
        })
      "
    >
      登録する
    </ActionButton>
    <span class="error">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputField from '@/components/InputField.vue'
import VCheckbox from '@/components/VCheckbox.vue'
import ActionButton from '@/components/ActionButton.vue'

@Component({
  components: {
    InputField,
    VCheckbox,
    ActionButton,
  },
})
export default class PatientRegister extends Vue {
  inputMobileTel = ''
  inputMemo = ''
  checkSendSMS = false

  @Prop({ default: '' })
  errorMessage?: string

  @Prop({ default: false })
  isProcessing!: boolean

  get isSubmittable(): boolean {
    return this.inputMobileTel !== ''
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }
}
</script>

<style lang="scss" scoped>
.inputContainer {
  margin: 30px 0;
}
.error {
  display: block;
  margin-top: 16px;
  color: $error;
}
</style>
