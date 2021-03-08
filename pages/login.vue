<template>
  <div>
    <Logo class="logoImage" />
    <div class="formArea">
      <h2 class="pageTitle">ログイン</h2>
      <p class="message">事務局が発行したIDとパスワードを入力してください。</p>
      <div class="inputContainer">
        <InputField
          v-model="user.username"
          class="inputItem"
          label="ログインID"
        />
        <InputField
          v-model="user.password"
          class="inputItem"
          label="パスワード"
          type="password"
        />
      </div>
      <div>
        <ActionButton
          class="loginBtn"
          theme="primary"
          size="L"
          @click="handleLogin()"
        >
          ログイン
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PageHeader from '@/components/PageHeader.vue'
import InputField from '@/components/InputField.vue'
import { authStore, nursesStore } from '@/store'
import Logo from '@/static/logo.svg'

@Component({
  layout: 'simple',
  components: {
    PageHeader,
    InputField,
    Logo,
  },
})
export default class Login extends Vue {
  private user = { username: '', password: '' }
  message = ''
  loading = false

  handleLogin() {
    if (this.user.username && this.user.password) {
      this.loading = true
      this.$nuxt.$loading.start()
      authStore.login(this.user).then(
        (user) => {
          this.$nuxt.$loading.finish()
          this.loading = false
          nursesStore.load(user.username).then((nurse) => {
            const centers = nurse.manageCenters
            if (centers.length === 1) {
              this.$router.push(`/centers/${centers[0].centerId}`)
            } else {
              this.$router.push('/')
            }
          })
        },
        (error) => {
          console.error(error)
          this.$nuxt.$loading.finish()
          this.loading = false
          this.message = 'ログインに失敗しました。'
        },
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.logoImage {
  display: block;
  margin: 0 auto;
}
.formArea {
  max-width: 600px;
  width: 100%;
  margin: 40px auto 0;
  padding: 56px 80px;
  background: $white;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(196, 198, 204, 0.3);
}
.pageTitle {
  margin: 0 0 40px;
  text-align: center;
}
.message {
  text-align: center;
}
.inputContainer {
  margin: 40px 0 0;
  width: 100%;
}
.inputItem {
  display: block;
  margin-bottom: 32px;
}
.loginBtn {
  max-width: 280px;
  width: 100%;
  display: block;
  margin: 0 auto;
}
</style>
