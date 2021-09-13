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
      <PatientRegistered v-else :new-patient="newPatient" :sended="sended" />
    </ModalBase>
    <div class="searchContainer">
      <SearchField v-model="inputSearch" @input="handleSearch" />
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
            <th></th>
            <th>症状</th>
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import ActionButton from '@/components/ActionButton.vue'
import PlusIcon from '@/static/icon-plus.svg'
import ModalBase from '@/components/ModalBase.vue'
import PatientRegister from '@/components/PatientRegister.vue'
import PatientRegistered from '@/components/PatientRegistered.vue'
import PatientOverview from '@/components/PatientOverview.vue'
import SearchField from '@/components/SearchField.vue'
import SortSelect from '@/components/SortSelect.vue'
import HiddenSelect from '@/components/HiddenSelect.vue'
import { authStore, patientsStore, utilsStore } from '@/store'
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
  searchWord = ''
  sortSelect = ''
  displaySelect = 'show-only-display-true'
  patients: Patient[] = []
  isProcessing = false
  errorMessage = ''
  sended = false
  newPatient: RegisteredPatient = {
    phone: '',
    memo: '',
    loginKey: '',
  }

  created(): void {
    this.checkAndFetchPatients()
    this.timer = setInterval(() => {
      this.checkAndFetchPatients()
    }, 30000)
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  @Watch('searchWord')
  onSearchWordChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.fetchPatients()
    }
  }

  checkAndFetchPatients(): void {
    authStore.checkIsExpired().then((expired) => {
      if (expired) {
        authStore
          .refreshToken()
          .then(() => {
            this.fetchPatients()
          })
          .catch((err) => {
            console.log(err)
            this.$router.push('/login')
          })
      } else {
        this.fetchPatients()
      }
    })
  }

  fetchPatients(): void {
    patientsStore.load(this.$route.params.centerId).then((patients) => {
      this.patients = patients.filter((item) => {
        return this.displaySelect === 'show-only-display-true'
          ? item.display
          : !item.display
      })
      if (this.searchWord) {
        this.patients = this.patients.filter((item) => {
          const pattern = new RegExp(this.searchWord, 'ig')
          return (
            pattern.test(item.phone) || (item.memo && pattern.test(item.memo))
          )
        })
      }
      this.sortSelect = utilsStore.getSortItem
      this.sortItems(this.sortSelect)
    })
  }

  handleDisplayPatient(patient: Patient): void {
    patientsStore.update(patient).then((patient) => {
      this.patients = this.patients.filter((item) => {
        return item.patientId !== patient.patientId
      })
      patientsStore.load(this.$route.params.centerId).then(() => {})
    })
  }

  sortItems(value: string): void {
    this.patients.sort((a: Patient, b: Patient) => {
      const patient = (target: Patient): number | string => {
        if (value.includes('SpO2')) {
          return target.statuses.length > 0 ? target.statuses[0].SpO2 : 0
        } else if (value.includes('body_temperature')) {
          return target.statuses.length > 0
            ? target.statuses[0].body_temperature
            : 0
        } else if (value.includes('policy_accepted')) {
          return Date.parse(target.policy_accepted)
        }
        return 0
      }

      if (!patient(a)) {
        return 1
      } else if (!patient(b)) {
        return -1
      } else if (value.includes('desc')) {
        return patient(a) < patient(b) ? 1 : -1
      } else if (value.includes('asc')) {
        return patient(a) < patient(b) ? -1 : 1
      }
      return 0
    })
  }

  handleSortSelect(value: string): void {
    utilsStore.setSortItem(value)
    this.sortItems(value)
  }

  handleDisplaySelect(): void {
    this.fetchPatients()
  }

  handleSearch(value: string): void {
    this.searchWord = value
  }

  handleInputTel(): void {
    this.errorMessage = ''
  }

  handleRegister(value: {
    mobileTel: string
    memo: string | undefined
    sendSMS: boolean
    isAccepted: boolean
  }): void {
    this.isProcessing = true
    const phoneNumber = value.mobileTel.replace(/-/g, '')
    if (phoneNumber.match(/^\d{11}$/)) {
      const newPatient: ConsumePatient = {
        centerId: this.$route.params.centerId,
        phone: phoneNumber,
        memo: value.memo,
        display: true,
        sendSMS: value.sendSMS,
        isAccepted: value.isAccepted,
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
          this.sended = value.sendSMS
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

  closeModal(): void {
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
    &:last-child {
      border: none;
    }
  }
}
.overviewTableHeader {
  display: grid;
  grid-template-columns: 8em 6em 4em 1fr 23%;
  grid-template-rows: auto;
  font-size: 16px;
  color: $gray-3;
  border-bottom: 1px solid $gray-3;
  padding: 8px 0;
  text-align: left;
  text-indent: 8px;
  th {
    display: block;
    font-weight: 600;
  }
}
</style>
