<template>
  <div>
    <p class="text">👈 保健所を選択してください</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
.text {
  font-size: 20px;
  margin-top: 200px;
  animation: arrow 0.7s alternate infinite;
}

@keyframes arrow {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 0);
  }
}
</style>
