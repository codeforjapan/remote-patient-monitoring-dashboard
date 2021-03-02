<template>
  <div>
    <PageHeader text="ログイン" />
    <div class="inputContainer">
      <InputField
        v-model="user.username"
        label="ログインID"
        @input="inputId = $event"
      />
      <InputField
        v-model="user.password"
        label="パスワード"
        type="password"
        @input="inputPassword = $event"
      />
    </div>
    <div>
      <ActionButton theme="primary" size="M" @click="handleLogin()">
        ログイン
      </ActionButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PageHeader from '@/components/PageHeader.vue'
import InputField from '@/components/InputField.vue'
import { authStore } from '@/store'

@Component({
  layout: 'simple',
  components: {
    PageHeader,
    InputField,
  },
})
export default class Login extends Vue {
  private user = { username: '', password: '' }
  message = ''
  loading = false

  handleLogin() {
    console.log(this.user)
    if (this.user.username && this.user.password) {
      this.loading = true
      this.$nuxt.$loading.start()
      console.log('login!')
      authStore.login(this.user).then(
        (data) => {
          this.$nuxt.$loading.finish()
          this.loading = false
          console.log(data)
          this.$router.push('/')
        },
        (error) => {
          console.log(error)
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
.inputContainer {
  width: 100%;
  max-width: 600px;
}
</style>
