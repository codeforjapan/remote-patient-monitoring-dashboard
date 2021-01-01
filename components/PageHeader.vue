<template>
  <div class="pageHeader">
    <h2 class="pageTitle">
      {{ text }}
    </h2>
    <div v-if="isLoggedIn" class="account">
      <ActionButton theme="primary" size="S" text="ログアウト" />
      <div class="accountInfo">
        <span>XX保健所</span><br />
        <span>管理者00001</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'

export default Vue.extend({
  components: {
    ActionButton,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.pageHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.pageTitle {
  margin: 0;
}
.account {
  display: flex;
  align-items: center;
}
.accountInfo {
  font-size: 14px;
  text-align: right;
  margin-left: 14px;
}
</style>
