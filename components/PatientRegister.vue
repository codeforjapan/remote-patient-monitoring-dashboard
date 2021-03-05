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
        label="携帯電話番号（ハイフン不要）"
        name="mobileTel"
        placeholder="例）09012345678"
        required
        rules="required"
      />
    </div>
    <div class="inputContainer">
      <InputField v-model="inputMemo" label="メモ（任意）" name="memo" />
    </div>
    <ActionButton
      type="submit"
      :theme="btnTheme"
      size="L"
      :is-submittable="isSubmittable"
      @click="
        $emit('click-register', {
          mobileTel: inputMobileTel,
          memo: inputMemo,
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
import ActionButton from '@/components/ActionButton.vue'

@Component({
  components: {
    InputField,
    ActionButton,
  },
})
export default class PatientRegister extends Vue {
  inputMobileTel = ''
  inputMemo = ''

  @Prop({ default: '' })
  errorMessage?: string

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
