<template>
  <div>
    <PageHeader text="患者登録" :is-logged-in="true" />
    <p>患者のIDを新規で発行します。</p>
    <div class="inputContainer">
      <InputField
        label="ニックネーム（任意）"
        name="memo"
        :value="inputMemo"
        @input="inputMemo = $event"
      />
      <p>患者には通知されない、識別用の任意のメモです。</p>
    </div>
    <div class="inputContainer">
      <InputField
        label="携帯電話番号（任意）"
        name="mobileTel"
        :value="inputMobileTel"
        @input="inputMobileTel = $event"
      />
      <p>
        SMS（ショートメッセージ）で、ID/PWDを通知します。<br />
        患者が普段使うスマートフォンの番号を入力してください。
      </p>
    </div>
    <ActionButton theme="primary" size="M" :is-inline="true">
      患者IDを発行する
    </ActionButton>
    <div class="flow">
      <RegistrationFlow :step="1" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import InputField from '@/components/InputField.vue'
import ActionButton from '@/components/ActionButton.vue'
import RegistrationFlow from '@/components/RegistrationFlow.vue'

export default Vue.extend({
  name: 'Register',
  components: {
    PageHeader,
    InputField,
    ActionButton,
    RegistrationFlow,
  },
  data() {
    return {
      inputMemo: '',
      inputMobileTel: '',
    }
  },
})
</script>

<style lang="scss" scoped>
.inputContainer {
  width: 100%;
  max-width: 600px;
  margin: 30px 0;
}
.flow {
  margin-top: 36px;
}
</style>
