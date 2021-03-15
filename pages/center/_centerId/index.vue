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
        :is-processing="isProcessing"
        :error-message="errorMessage"
        @input-tel="handleInputTel"
        @click-register="handleRegister"
      />
      <PatientRegistered v-else :new-patient="newPatient" />
    </ModalBase>
    <div class="searchContainer">
      <SearchField v-model="inputSearch" />
      <SortSelect v-model="sortSelect" @input="handleSortSelect" />
      <HiddenSelect v-model="displaySelect" @input="handleDisplaySelect" />
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
              v-if="patient.policy_accepted"
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
import { authStore, patientsStore } from '@/store'
import {
  Patient,
  ConsumePatient,
  RegisteredPatient,
} from '@/types/component-interfaces/patient'

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
export default class CenterId extends Vue {
  timer: ReturnType<typeof setInterval> | null = null
  showModal = false
  registered = false
  inputSearch = ''
  sortSelect = 'policy-accepted-desc'
  displaySelect = 'show-only-display-true'
  patients: Patient[] = []
  isProcessing = false
  errorMessage = ''
  newPatient: RegisteredPatient = {
    phone: '',
    memo: '',
    loginKey: '',
  }

  created() {
    this.fetchPatients()
    this.timer = setInterval(() => {
      if (authStore.isExpired) {
        authStore.refreshToken().then(() => {
          this.fetchPatients()
        })
      } else {
        this.fetchPatients()
      }
    }, 300000)
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  fetchPatients() {
    patientsStore.load(this.$route.params.centerId).then((patients) => {
      this.patients = patients
        .filter((item) => {
          return this.displaySelect === 'show-only-display-true'
            ? item.display
            : !item.display
        })
        .sort((a: Patient, b: Patient) => {
          const patientA = Date.parse(a.policy_accepted)
          const patientB = Date.parse(b.policy_accepted)

          if (!patientA) {
            return 1
          } else if (!patientB) {
            return -1
          } else if (this.sortSelect === 'policy-accepted-desc') {
            return patientA < patientB ? 1 : -1
          } else if (this.sortSelect === 'policy-accepted-asc') {
            return patientA < patientB ? -1 : 1
          }
          return 0
        })
    })
  }

  handleDisplayPatient(patient: Patient) {
    patientsStore.update(patient).then((patient) => {
      this.patients = this.patients.filter((item) => {
        return item.patientId !== patient.patientId
      })
      patientsStore.load(this.$route.params.centerId).then(() => {})
    })
  }

  handleSortSelect(value: string) {
    this.patients.sort((a: Patient, b: Patient) => {
      const patientA = Date.parse(a.policy_accepted)
      const patientB = Date.parse(b.policy_accepted)

      if (!patientA) {
        return 1
      } else if (!patientB) {
        return -1
      } else if (value === 'policy-accepted-desc') {
        return patientA < patientB ? 1 : -1
      } else if (value === 'policy-accepted-asc') {
        return patientA < patientB ? -1 : 1
      }
      return 0
    })
  }

  handleDisplaySelect() {
    this.fetchPatients()
  }

  handleInputTel() {
    this.errorMessage = ''
  }

  handleRegister(value: { mobileTel: string; memo: string | undefined }) {
    this.isProcessing = true
    const phoneNumber = value.mobileTel.replace(/-/g, '')
    if (phoneNumber.match(/^\d{11}$/)) {
      const newPatient: ConsumePatient = {
        centerId: this.$route.params.centerId,
        phone: phoneNumber,
        memo: value.memo,
        display: true,
      }
      patientsStore
        .create(newPatient)
        .then((patient: RegisteredPatient) => {
          this.registered = true
          this.newPatient = {
            phone: patient.phone,
            memo: patient.memo,
            loginKey: patient.loginKey,
          }
        })
        .catch((error) => {
          this.errorMessage = error
        })
        .finally(() => {
          this.isProcessing = false
        })
    } else {
      this.isProcessing = false
      this.errorMessage =
        '電話番号が不正です。桁数の過不足あるいは数字以外を入力していませんか？'
    }
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
  grid-template-columns: 8em 8em 6em 1fr 13% 8em;
  grid-template-rows: auto;
  font-size: 16px;
  color: $gray-3;
  border-bottom: 1px solid $gray-3;
  padding: 8px 0;
  text-align: left;
  text-indent: 16px;
  th {
    font-weight: 600;
  }
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
