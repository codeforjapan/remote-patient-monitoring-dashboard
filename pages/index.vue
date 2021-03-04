<template>
  <div>
    <div class="pageHeader">
      <h2 class="pageTitle">患者一覧</h2>
      <ActionButton
        class="newPatientBtn"
        theme="primary"
        size="M"
        :is-inline="true"
        @click="showModal = true"
      >
        <PlusIcon />
        新規患者
      </ActionButton>
    </div>
    <ModalBase :show="showModal" @close="closeModal">
      <PatientRegister
        v-if="!registered"
        :error-message="errorMessage"
        @click-register="handleRegister"
      />
      <PatientRegistered
        v-else
        :patient-id="newPatientId"
        :phone="newPatientPhone"
      />
    </ModalBase>
    <div class="searchContainer">
      <SearchField v-model="inputSearch" />
      <SortSelect v-model="sortSelect" />
      <HiddenSelect v-model="displaySelect" @input="handleSelect" />
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
import ActionButton from '@/components/ActionButton.vue'
import PlusIcon from '@/static/icon-plus.svg'
import ModalBase from '@/components/ModalBase.vue'
import PatientRegister from '@/components/PatientRegister.vue'
import PatientRegistered from '@/components/PatientRegistered.vue'
import PatientOverview from '@/components/PatientOverview.vue'
import SearchField from '@/components/SearchField.vue'
import SortSelect from '@/components/SortSelect.vue'
import HiddenSelect from '@/components/HiddenSelect.vue'
import { patientsStore } from '@/store'
import { Patient, ConsumePatient } from '@/types/component-interfaces/patient'

@Component({
  components: {
    ActionButton,
    PlusIcon,
    ModalBase,
    PatientRegister,
    PatientRegistered,
    PatientOverview,
    SearchField,
    SortSelect,
    HiddenSelect,
  },
})
export default class Index extends Vue {
  showModal = false
  registered = false
  inputSearch = ''
  sortSelect = ''
  displaySelect = 'show-only-display-true'
  patients: Patient[] = []
  newPatientId = ''
  newPatientPhone = ''
  errorMessage = ''

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

  handleRegister(value: string) {
    const newPatient: ConsumePatient = {
      patientId: value.patientId,
      phone: value.mobileTel,
      display: true,
    }
    patientsStore
      .create(newPatient)
      .then((patient) => {
        this.patients = patientsStore.getPatients
        this.registered = true
        this.newPatientId = patient.patientId
        this.newPatientPhone = patient.phone
      })
      .catch((error) => {
        this.errorMessage = error
      })
  }

  closeModal() {
    this.showModal = false
    this.registered = false
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.pageTitle {
  margin: 0;
}
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
