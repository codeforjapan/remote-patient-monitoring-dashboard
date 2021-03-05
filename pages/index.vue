<template>
  <div>
    <div class="selectContainer">
      <select v-model="selected" class="select" @change="handleChange">
        <option value="">保健所を選択してください</option>
        <option
          v-for="(center, index) in centers"
          :key="index"
          :value="center.centerId"
        >
          {{ center.centerId }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { authStore, nursesStore } from '@/store'
import { Center } from '@/types/component-interfaces/nurse'

@Component
export default class Index extends Vue {
  centers: Center[] = []
  selected = ''

  created() {
    if (authStore.user) {
      nursesStore.load(authStore.user.username).then((nurse) => {
        this.centers = nurse.manageCenters
      })
    } else {
      authStore.signOut()
      this.$router.push('/login')
    }
  }

  handleChange() {
    nursesStore.setCenter(this.selected)
    this.$router.push(`/centers/${this.selected}`)
  }
}
</script>

<style lang="scss" scoped>
.selectContainer {
  margin-left: 16px;
  position: relative;
  border-radius: 10px;
  background-color: $white;
  &::before {
    position: absolute;
    top: 50%;
    right: 0.8em;
    margin-top: -2px;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid $gray-3;
    pointer-events: none;
  }
}
.select {
  width: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  appearance: none;
  font-size: 16px;
  padding: 12px 38px 12px 12px;
}
</style>
