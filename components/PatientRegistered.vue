<template>
  <div>
    <h2>患者登録完了</h2>
    <p>患者のIDを発行しました。</p>
    <dl class="registrationList">
      <dt class="registrationTitle">患者ID</dt>
      <dd class="registrationItem">03Xdt</dd>
      <dt class="registrationTitle">パスワード</dt>
      <dd class="registrationItem">xm4HY</dd>
      <dt class="registrationTitle">携帯電話番号</dt>
      <dd class="registrationItem">
        <span>090-0000-0000</span>
        <p class="subText">こちらの携帯番号に利用方法を送信済みです。</p>
      </dd>
      <dt class="registrationTitle">症状入力サイトURL</dt>
      <dd class="registrationItem">https://xxxxxx.jp</dd>
      <dt class="registrationTitle">ニックネーム</dt>
      <dd class="registrationItem">Sさん</dd>
    </dl>
    <ActionButton
      theme="primary"
      size="M"
      :is-inline="true"
      @click="$emit('click-reset')"
    >
      別のIDを発行する
    </ActionButton>
    <div class="flow">
      <RegistrationFlow :step="2" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import RegistrationFlow from '@/components/RegistrationFlow.vue'

export default Vue.extend({
  components: {
    ActionButton,
    RegistrationFlow,
  },
})
</script>

<style lang="scss" scoped>
.registrationList {
  font-size: 24px;
  font-weight: bold;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
.registrationTitle {
  clear: both;
  float: left;
  width: 12em;
  margin-bottom: 12px;
}
.registrationItem {
  float: left;
  margin: 0 0 12px;
  .subText {
    font-size: 18px;
    font-weight: normal;
    margin: 0;
  }
}
.flow {
  margin-top: 36px;
}
</style>
