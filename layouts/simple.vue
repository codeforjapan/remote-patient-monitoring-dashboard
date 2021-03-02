<template>
  <main class="mainContainer">
    <div class="mainInner">
      <Nuxt />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'simple',
})
export default class Simple extends Vue {}
</script>

<style lang="scss" scoped>
.mainContainer {
  background-color: $bg-gray;
}
.mainInner {
  padding: 36px 30px 30px;
}
</style>
