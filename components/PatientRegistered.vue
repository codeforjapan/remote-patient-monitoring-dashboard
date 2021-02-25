<template>
  <div>
    <h2>登録完了</h2>
    <p>
      ログイン用のURLを記載したメッセージを送信しました。<br />
      患者に受信の確認をしてください。
    </p>
    <dl class="registrationList">
      <dt class="registrationTitle">患者ID</dt>
      <dd class="registrationItem">2022433050</dd>
      <dt class="registrationTitle">携帯電話番号</dt>
      <dd class="registrationItem">xxx-xxxx-0000</dd>
    </dl>
    <div class="registrationMessage">
      <p class="registrationText">
        送信に少々お時間がかかる場合があります。<br />
        <br />
        しばらく経ってもメッセージが届かない場合は以下をご確認ください。<br />
        <br />
        • 端末がSMSの受信を制限していないかどうか<br />
        • 電話番号の入力に間違いがないかどうか<br />
        <br />
        メッセージが届かない場合は、再送をお試しください。
      </p>
      <a class="registrationTextLink" href="">メッセージを再送する</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {},
})
</script>

<style lang="scss" scoped>
.registrationTitle {
  margin: 24px 0 8px;
}
.registrationItem {
  font-weight: 700;
  margin-left: 0;
}
.registrationMessage {
  background-color: $background;
  margin: 24px 0 0;
  padding: 16px;
}
.registrationText {
  margin: 0 0 32px;
}
.registrationTextLink {
  color: $primary;
}
</style>
