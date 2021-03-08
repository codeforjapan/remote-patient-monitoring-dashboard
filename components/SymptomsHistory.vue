<template>
  <section>
    <table class="symptomsHistoryTable">
      <thead>
        <tr class="symptomsHistoryRow symptomsHistoryHeader">
          <th>記録日時</th>
          <th>
            SpO2
            <LiftAndLowerIcon />
          </th>
          <th>
            体温
            <LiftAndLowerIcon />
          </th>
          <th>
            脈拍
            <LiftAndLowerIcon />
          </th>
          <th>症状</th>
          <th>症状</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in reverseItems"
          :key="index"
          class="symptomsHistoryRow"
        >
          <td class="alignLeft">{{ getDate(item.created) }}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { Status } from '@/types/component-interfaces/status'
// import SymptomsStatusText from '@/components/SymptomsStatusText.vue'
// import SymptomsStatus from '@/components/SymptomsStatus.vue'
import LiftAndLowerIcon from '@/static/icon-liftAndLower.svg'

export default Vue.extend({
  components: {
    // SymptomsStatusText,
    // SymptomsStatus,
    LiftAndLowerIcon,
  },
  props: {
    statuses: {
      type: Array as () => Status[],
      default: [],
    },
  },
  computed: {
    reverseItems(): Status[] {
      return this.statuses.slice().reverse()
    },
  },
  methods: {
    getDate(date: string): string {
      return dayjs(date).format('MM/DD HH:mm')
    },
  },
})
</script>

<style lang="scss" scoped>
.symptomsHistoryTitle {
  font-size: 24px;
  margin: 32px;
}
.symptomsHistoryTable {
  width: 100%;
  font-size: 16px;
  tbody tr {
    border-bottom: 1px solid $gray-1;
    padding: 16px 0;
  }
}
.symptomsHistoryRow {
  display: grid;
  grid-template-columns: 120px 1fr 1fr 1fr 24% 35%;
  grid-template-rows: auto;
  padding: 0 12px 0 0;
  td {
    text-align: center;
    align-self: center;
    padding: 8px 4px;
  }
  th {
    text-align: left;
    align-self: center;
    padding: 8px 4px;

    &.alignLeft {
      text-align: left;
    }
  }
}
.symptomsHistoryHeader {
  color: $gray-2;
}
</style>
