<template>
  <div>
    <div class="pageHeader">
      <h2 class="pageTitle">
        {{ text }}
      </h2>
      <ActionButton
        v-if="isLoggedIn"
        theme="primary"
        size="M"
        :is-inline="true"
        @click="showModal = true"
      >
        <PlusIcon />
        新規患者
      </ActionButton>
    </div>
    <ModalBase :show="showModal" @close="showModal = false">
      <PatientRegister v-if="!registered" @click-register="registered = true" />
      <PatientRegistered v-else @click-reset="registered = false" />
    </ModalBase>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import PlusIcon from '@/static/icon-plus.svg'
import ModalBase from '@/components/ModalBase.vue'
import PatientRegister from '@/components/PatientRegister.vue'
import PatientRegistered from '@/components/PatientRegistered.vue'

export default Vue.extend({
  components: {
    ActionButton,
    PlusIcon,
    ModalBase,
    PatientRegister,
    PatientRegistered,
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
  data() {
    return {
      showModal: false,
      registered: false,
    }
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
