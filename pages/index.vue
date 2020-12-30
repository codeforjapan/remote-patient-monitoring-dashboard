<template>
  <div>
    <PageHeader text="患者データ一覧" />
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
