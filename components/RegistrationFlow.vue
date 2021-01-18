<template>
  <section>
    <h3>ID発行と通知の流れ</h3>
    <ul class="registrationFlowList">
      <li :class="['registrationFlowItem', { active: step === 1 }]">
        <p class="registrationFlowText">ID発行</p>
      </li>
      <li :class="['registrationFlowItem', { active: step === 2 }]">
        <p class="registrationFlowText alignLeft">
          発行されたIDとパスワード、症状入力用URLを患者に伝える
        </p>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    step: {
      type: Number,
      default: 0,
    },
  },
})
</script>

<style lang="scss" scoped>
.registrationFlowList {
  display: flex;
}
.registrationFlowItem {
  display: flex;
  align-items: center;
  width: 180px;
  padding: 20px;
  margin-right: 16px;
  background-color: $gray-1;
  &.active {
    background-color: $notice;
  }
}
.registrationFlowText {
  flex: 1 1 auto;
  text-align: center;
  margin: 0;
  &.alignLeft {
    text-align: left;
  }
}
</style>
