<template>
  <div>
    <PageHeader text="ログイン" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '~/components/PageHeader.vue'

export default Vue.extend({
  name: 'Index',
  components: {
    PageHeader,
  },
})
</script>
