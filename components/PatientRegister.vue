<template>
  <div>
    <h2>新規患者を登録する</h2>
    <p>
      入力された電話番号にショートメッセージにてログイン用のURLを送ります。<br />
      受信者に通信料金がかかる場合があります。
    </p>
    <dl class="registrationList">
      <dt class="registrationTitle">患者ID</dt>
      <dd class="registrationItem">2022433050</dd>
    </dl>

    <div class="inputContainer">
      <InputField
        label="携帯電話番号（ハイフン不要）"
        name="mobileTel"
        :value="inputMobileTel"
        placeholder="例）09012345678"
        @input="inputMobileTel = $event"
      />
    </div>
    <ActionButton
      theme="primary"
      size="L"
      :is-inline="false"
      @click="$emit('click-register')"
    >
      登録する
    </ActionButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputField from '@/components/InputField.vue'
import ActionButton from '@/components/ActionButton.vue'

export default Vue.extend({
  components: {
    InputField,
    ActionButton,
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
.inputFieldContainer {
  display: block;
}
.inputContainer {
  width: 100%;
  max-width: 600px;
  margin: 30px 0;
}
/deep/ .labelText {
  display: block;
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 400;
}
/deep/ .inputField {
  width: 100%;
}
.registrationList {
  margin: 40px 0 0;
}
.registrationTitle {
  margin: 8px 0;
}
.registrationItem {
  font-weight: 700;
  margin-left: 0;
}
</style>
