<template>
  <section>
    <h3 class="symptomsHistoryTitle">症状履歴</h3>
    <table class="symptomsHistoryTable">
      <thead>
        <tr class="symptomsHistoryRow symptomsHistoryHeader">
          <th>最終更新</th>
          <th>せき</th>
          <th>たん</th>
          <th>息苦しさ</th>
          <th>頭痛</th>
          <th>のどの痛み</th>
          <th>その他連絡事項</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in reverseItems"
          :key="index"
          class="symptomsHistoryRow"
        >
          <td class="alignLeft">{{ getDate(item.created) }}</td>
          <td>
            <SymptomsStatusText :is-active="item.symptom.cough" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.symptom.phlegm" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.symptom.suffocation" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.symptom.headache" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.symptom.sore_throat" />
          </td>
          <td class="alignLeft">{{ item.symptom.remarks }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { Status } from '@/types/component-interfaces/status'
import SymptomsStatusText from '@/components/SymptomsStatusText.vue'

export default Vue.extend({
  components: {
    SymptomsStatusText,
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
    border-bottom: 1px solid $gray-3;
    &:last-child {
      border: none;
    }
  }
}
.symptomsHistoryRow {
  display: grid;
  grid-template-columns: 120px 1fr 1fr 1fr 1fr 1fr 35%;
  grid-template-rows: auto;
  padding: 0 12px;
  td,
  th {
    text-align: center;
    align-self: center;
    padding: 8px 4px;
    &.alignLeft {
      text-align: left;
    }
  }
}
.symptomsHistoryHeader {
  color: $gray-3;
  border-bottom: 1px solid $gray-3;
}
</style>
