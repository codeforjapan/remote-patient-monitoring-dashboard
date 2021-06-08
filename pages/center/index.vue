<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { authStore } from '@/store'

@Component
export default class Index extends Vue {
  created() {
    if (authStore.user != null) {
      authStore.refreshToken().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
