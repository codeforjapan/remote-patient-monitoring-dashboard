<template>
  <div>
    <PageHeader text="ログイン" />
    <div class="inputContainer">
      <InputField
        label="ログインID"
        :value="inputId"
        @input="inputId = $event"
      />
      <InputField
        label="パスワード"
        type="password"
        :value="inputPassword"
        @input="inputPassword = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import InputField from '@/components/InputField.vue'

export default Vue.extend({
  name: 'Index',
  components: {
    PageHeader,
    InputField,
  },
  data() {
    return {
      inputId: '',
      inputPassword: '',
    }
  },
})
</script>

<style lang="scss" scoped>
.inputContainer {
  width: 100%;
  max-width: 600px;
}
</style>
