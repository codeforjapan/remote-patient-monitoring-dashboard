<template>
  <div class="pageHeader">
    <h2 class="pageTitle">
      {{ text }}
    </h2>
    <ActionButton v-if="isLoggedIn" theme="primary" size="M" :is-inline="true">
      <PlusIcon />
      新規患者
    </ActionButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import PlusIcon from '@/static/icon-plus.svg'

export default Vue.extend({
  components: {
    ActionButton,
    PlusIcon,
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
</style>
