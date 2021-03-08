<template>
  <div>
    <h2>登録完了</h2>
    <p>
      ログイン用のURLを記載したメッセージを送信しました。<br />
      患者に受信の確認をしてください。
    </p>
    <dl class="registrationList">
      <dt class="registrationTitle">携帯電話番号</dt>
      <dd class="registrationItem">{{ newPatient.phone }}</dd>
      <dt v-if="newPatient.memo" class="registrationTitle">メモ</dt>
      <dd v-if="newPatient.memo" class="registrationItem">
        {{ newPatient.memo }}
      </dd>
      <dt class="registrationTitle">患者ログインURL</dt>
      <dd class="registrationItem">
        <div class="fieldWithIcon">
          <input
            ref="loginUrl"
            class="inputFieldReadOnly"
            type="text"
            :value="`${clientUrl}/login/${newPatient.loginKey}`"
            readonly
          />
          <CopyIcon class="icon" @click="copyToClipboard" />
        </div>
      </dd>
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import CopyIcon from '@/static/icon-copy.svg'
import { RegisteredPatient } from '@/types/component-interfaces/patient'

@Component({
  components: {
    CopyIcon,
  },
})
export default class PatientRegistered extends Vue {
  clientUrl = process.env.clientUrl

  @Prop({ default: () => ({ phone: '', memo: '', loginKey: '' }) })
  newPatient!: RegisteredPatient

  copyToClipboard() {
    const input: HTMLInputElement = this.$refs.loginUrl as HTMLInputElement
    input.select()
    document.execCommand('copy')
    alert('コピーしました')
  }
}
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
.fieldWithIcon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inputFieldReadOnly {
  width: calc(100% - 30px);
  padding: 8px;
}
.icon {
  width: 20px;
}
</style>
