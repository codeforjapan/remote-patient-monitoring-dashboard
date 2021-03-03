<template>
  <div>
    <PageHeader text="患者一覧" :is-logged-in="true" />
    <div class="searchContainer">
      <SearchField :value="inputSearch" @input="inputSearch = $event" />
      <SortSelect v-model="itemSelect" />
      <HiddenSelect v-model="itemDisplaySelect" @input="handleSelect" />
    </div>
    <div class="overviewContainer">
      <table class="overviewTable">
        <thead>
          <tr class="overviewTableHeader">
            <th>患者ID</th>
            <th>最終更新</th>
            <th>SpO2</th>
            <th class="overviewLabel">
              <span class="sp02">SpO2</span>
              <span class="temp">体温</span>
              <span class="pulse">脈拍</span>
            </th>
            <th>症状</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(patient, index) in patients">
            <PatientOverview
              v-if="patient.statuses.length > 0"
              :key="index"
              :patient="patient"
              @click="handleDisplayPatient"
            />
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PageHeader from '@/components/PageHeader.vue'
import PatientOverview from '@/components/PatientOverview.vue'
import SearchField from '@/components/SearchField.vue'
import SortSelect from '@/components/SortSelect.vue'
import HiddenSelect from '@/components/HiddenSelect.vue'
import { patientsStore } from '@/store'
import { Patient, ConsumePatient } from '@/types/component-interfaces/patient'

@Component({
  components: {
    PageHeader,
    PatientOverview,
    SearchField,
    SortSelect,
    HiddenSelect,
  },
})
export default class Index extends Vue {
  inputSearch = ''
  itemSelect = ''
  itemDisplaySelect = 'show-only-display-true'
  patients: Patient[] = []

  created() {
    patientsStore.load().then((patients) => {
      this.patients = patients.filter((item) => {
        return item.display
      })
    })
  }

  handleDisplayPatient(patient: ConsumePatient) {
    patientsStore.update(patient).then((patient) => {
      patientsStore.load().then(() => {
        this.patients = this.patients.filter((item) => {
          return item.patientId !== patient.patientId
        })
      })
    })
  }

  handleSelect(value: string) {
    if (value === 'show-only-display-true') {
      this.patients = patientsStore.getPatients.filter((item) => {
        return item.display
      })
    } else if (value === 'show-only-display-false') {
      this.patients = patientsStore.getPatients.filter((item) => {
        return !item.display
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.searchContainer {
  display: flex;
  margin: 16px 0;
}
.overviewContainer {
  background-color: $white;
  border-radius: 8px;
  overflow: hidden;
}
.overviewTable {
  width: 100%;
  border-spacing: 0;
  tbody tr {
    border-bottom: 1px solid $gray-3;
    padding: 8px 0;
    &:last-child {
      border: none;
    }
  }
}
.overviewTableHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 40% 17% 1fr;
  grid-template-rows: auto;
  font-size: 16px;
  color: $gray-3;
  border-bottom: 1px solid $gray-3;
  padding: 8px 0;
  text-align: left;
  text-indent: 16px;
}
.overviewLabel {
  font-size: 12px;
  font-weight: 400;
  align-self: center;
  .sp02 {
    color: $primary;
  }
  .temp {
    color: $tertiary;
  }
  .pulse {
    color: $secondary;
  }
}
</style>
