<template>
  <div>
    <PageHeader text="ログイン" />
    <div class="inputContainer">
      <InputField v-model="user.username" label="ログインID" />
      <InputField v-model="user.password" label="パスワード" type="password" />
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
import { authStore, nursesStore } from '@/store'

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
              this.$router.push(`/center/${centers[0].centerId}`)
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
.inputContainer {
  width: 100%;
  max-width: 600px;
}
</style>
