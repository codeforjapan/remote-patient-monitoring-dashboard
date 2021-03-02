<template>
  <div class="appContainer">
    <div class="sideContainer">
      <div class="sideInner">
        <Sidebar />
      </div>
    </div>
    <main class="mainContainer">
      <div class="mainInner">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '@/components/Sidebar.vue'

@Component({
  middleware: ['authenticated'],
  components: {
    Sidebar,
  },
})
export default class Default extends Vue {}
</script>

<style lang="scss" scoped>
$sidebarWidth: 255px;

.appContainer {
  position: relative;
  display: grid;
  grid-template-columns: $sidebarWidth 1fr;
  grid-template-rows: auto;
}
.sideContainer {
  grid-column: 1/2;
  position: fixed;
  top: 0;
  overflow-y: auto;
  width: $sidebarWidth;
  height: 100%;
  background-color: $bg-black;
  overscroll-behavior: contain;
}
.sideInner {
  padding: 36px 30px 30px;
}
.mainContainer {
  grid-column: 2/3;
  overflow: hidden;
  background-color: $bg-gray;
}
.mainInner {
  padding: 36px 30px 30px;
}
</style>
