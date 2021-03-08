<template>
  <div>
    <Logo class="logoImage" />
    <div class="formArea">
      <PageHeader class="pageLogin" text="ログイン" />
      <div class="inputContainer">
        <label class="selectTitle">保健所</label>
        <div class="selectContainer">
          <select v-model="selected" class="select" @change="handleChange">
            <option value="">保健所を選択してください</option>
            <option
              v-for="(center, index) in centers"
              :key="index"
              :value="center.centerId"
            >
              {{ center.centerId }}
            </option>
          </select>
        </div>
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
import { Center } from '@/types/component-interfaces/nurse'
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
  centers: Center[] = []
  selected = ''

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
}
/deep/ .pageTitle {
  margin: 0 auto;
}
.inputContainer {
  margin: 40px 0 0;
  width: 100%;
}
.selectTitle {
  display: block;
  margin-bottom: 8px;
}
.selectContainer {
  position: relative;
  width: 100%;
  margin-bottom: 32px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid $gray-2;
  &::before {
    position: absolute;
    top: 50%;
    right: 0.8em;
    margin-top: -2px;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid $gray-1;
    pointer-events: none;
  }
}
.select {
  width: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  appearance: none;
  font-size: 16px;
  padding: 12px 38px 12px 0;
  color: $gray-1;
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
