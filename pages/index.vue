<template>
  <div>
    <PageHeader text="患者データ一覧" :is-logged-in="true" />
    <section class="overviewContainer">
      <div class="overviewHeader">
        <h3 class="overviewTitle">患者一覧</h3>
        <div>
          <SearchField :value="inputSearch" @input="inputSearch = $event" />
          <IconActionButton text="ソート" icon="SortIcon" />
          <IconActionButton text="絞り込み" icon="FilterIcon" />
        </div>
      </div>
      <table class="overviewTable">
        <thead>
          <tr class="overviewTableHeader">
            <th>患者ID</th>
            <th>最終更新</th>
            <th>体温</th>
            <th>脈拍</th>
            <th>SpO2</th>
            <th></th>
            <th>症状</th>
          </tr>
        </thead>
        <tbody>
          <PatientOverview
            :patient-id="{ id: '03Xdt', nickname: 'Aさん' }"
            last-update="12/27 22:00"
            temperature="37.2"
            pulse="80"
            spo2="98.2"
            :is-active-cough="false"
            :is-active-sputum="false"
            :is-active-suffocation="false"
            :is-active-headache="true"
            :is-active-throat="false"
            :is-active-other="false"
          />
          <PatientOverview
            :patient-id="{ id: '03Xdt', nickname: 'Aさん' }"
            last-update="12/27 22:00"
            temperature="37.2"
            pulse="80"
            spo2="98.2"
            :is-active-cough="true"
            :is-active-sputum="false"
            :is-active-suffocation="false"
            :is-active-headache="false"
            :is-active-throat="true"
            :is-active-other="false"
          />
          <PatientOverview
            :patient-id="{ id: '03Xdt', nickname: 'Aさん' }"
            last-update="12/27 22:00"
            temperature="37.2"
            pulse="80"
            spo2="98.2"
            :is-active-cough="true"
            :is-active-sputum="false"
            :is-active-suffocation="false"
            :is-active-headache="false"
            :is-active-throat="true"
            :is-active-other="false"
            :is-outdated="true"
          />
          <PatientOverview
            :patient-id="{ id: '03Xdt', nickname: 'Aさん' }"
            last-update="12/27 22:00"
            temperature="37.2"
            pulse="80"
            spo2="98.2"
            :is-active-cough="true"
            :is-active-sputum="false"
            :is-active-suffocation="false"
            :is-active-headache="false"
            :is-active-throat="true"
            :is-active-other="false"
            :is-alerted="true"
          />
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import PatientOverview from '@/components/PatientOverview.vue'
import SearchField from '@/components/SearchField.vue'
import IconActionButton from '@/components/IconActionButton.vue'

export default Vue.extend({
  name: 'Index',
  components: {
    PageHeader,
    PatientOverview,
    SearchField,
    IconActionButton,
  },
  data() {
    return {
      inputSearch: '',
    }
  },
})
</script>

<style lang="scss" scoped>
.overviewContainer {
  background-color: $white;
  border: 1px solid $gray-2;
  border-radius: 8px;
  overflow: hidden;
}
.overviewHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.overviewTitle {
  margin: 32px;
}
.overviewTable {
  width: 100%;
  border-spacing: 0;
  tbody tr {
    border-bottom: 1px solid $gray-2;
    padding: 8px 0;
    &:last-child {
      border: none;
    }
  }
}
.overviewTableHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 30% 24%;
  grid-template-rows: auto;
  font-size: 16px;
  color: $gray-3;
  border-bottom: 1px solid $gray-2;
  padding: 8px 0;
}
</style>
