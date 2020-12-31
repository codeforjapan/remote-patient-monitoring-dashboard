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
          <td class="alignLeft">{{ item.date }}</td>
          <td>
            <SymptomsStatusText :is-active="item.isActiveCough" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.isActiveSputum" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.isActiveSuffocation" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.isActiveHeadache" />
          </td>
          <td>
            <SymptomsStatusText :is-active="item.isActiveThroat" />
          </td>
          <td class="alignLeft">{{ item.other }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import SymptomsStatusText from '@/components/SymptomsStatusText.vue'

type Item = {
  date: string
  isActiveCough: boolean
  isActiveSputum: boolean
  isActiveSuffocation: boolean
  isActiveHeadache: boolean
  isActiveThroat: boolean
  other: string
}

export default Vue.extend({
  components: {
    SymptomsStatusText,
  },
  data(): {
    items: Item[]
  } {
    return {
      items: [
        {
          date: '12/27 9:00',
          isActiveCough: false,
          isActiveSputum: false,
          isActiveSuffocation: false,
          isActiveHeadache: false,
          isActiveThroat: true,
          other: 'のどが痛くなってきました。',
        },
        {
          date: '12/27 22:00',
          isActiveCough: true,
          isActiveSputum: true,
          isActiveSuffocation: false,
          isActiveHeadache: false,
          isActiveThroat: true,
          other: 'かなりせきがでるようになり、とてもつらいです。',
        },
      ],
    }
  },
  computed: {
    reverseItems(): Item[] {
      return this.items.slice().reverse()
    },
  },
})
</script>

<style lang="scss" scoped>
.symptomsHistoryTitle {
  margin: 32px;
}
.symptomsHistoryTable {
  width: 100%;
  font-size: 16px;
  tbody tr {
    border-bottom: 1px solid $gray-2;
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
  border-bottom: 1px solid $gray-2;
}
</style>
