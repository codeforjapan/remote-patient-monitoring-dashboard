<template>
  <div>
    <div class="pageHeader">
      <h2 class="pageTitle">患者データ</h2>
      <ActionButton
        theme="outline"
        size="M"
        :is-inline="true"
        :to="`/center/${centerId}`"
        @click="$emit('click-register')"
      >
        一覧に戻る
      </ActionButton>
    </div>
    <div class="patientContainer">
      <div class="patientHeader">
        <div>
          <span class="patentId">
            患者ID：
            <InputField
              v-model="memoValue"
              class="memo"
              :disabled="isEditDisabled"
            />
            <EditIcon
              v-if="isEditDisabled"
              class="icon"
              @click="isEditDisabled = false"
            />
            <span v-else>
              <SaveIcon class="icon" @click="updateMemo" />
              <CloseIcon class="icon" @click="cancelMemo" />
            </span>
          </span>
        </div>
        <div>
          <span class="monitoringTerm">
            モニタリング開始：{{ getDate(patient.policy_accepted) }}
          </span>
          <span
            v-if="patient.display"
            class="isDataDisplay"
            @click="handleDisplayPatient(false)"
          >
            患者データを非表示にする
          </span>
          <span
            v-else
            class="isDataDisplay"
            @click="handleDisplayPatient(true)"
          >
            患者データを表示する
          </span>
        </div>
      </div>
      <div class="patientGraphLayout">
        <PatientGraph />
      </div>
      <SymptomsHistory class="symptomsHistory" :statuses="patient.statuses" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { Patient } from '@/types/component-interfaces/patient'
import ActionButton from '@/components/ActionButton.vue'
import SymptomsHistory from '@/components/SymptomsHistory.vue'
import InputField from '@/components/InputField.vue'
import EditIcon from '@/static/icon-edit.svg'
import SaveIcon from '@/static/icon-save.svg'
import CloseIcon from '@/static/icon-close.svg'
import { nursesStore, patientsStore } from '@/store'

@Component({
  name: 'patientId',
  components: {
    ActionButton,
    SymptomsHistory,
    InputField,
    EditIcon,
    SaveIcon,
    CloseIcon,
  },
})
export default class PatientId extends Vue {
  isEditDisabled = true
  currentMemoValue = ''
  patient: Patient | undefined = {
    patientId: '',
    centerId: '',
    policy_accepted: '',
    phone: '',
    memo: '',
    display: true,
    statuses: [],
  }

  created() {
    if (patientsStore.getPatients.length > 0) {
      this.patient = patientsStore.getPatients.find(
        (patient) => patient.patientId === this.$route.params.patientId,
      )
      this.currentMemoValue = this.patient?.memo
    } else {
      patientsStore
        .loadPatient(this.$route.params.patientId)
        .then((patient) => {
          this.patient = patient
          this.currentMemoValue = this.patient?.memo
        })
    }
  }

  get centerId() {
    return nursesStore.getCenterId
  }

  get memoValue() {
    return this.patient?.memo
  }

  set memoValue(value) {
    patientsStore.updatePatientMemo(value)
  }

  getDate(date: string): string {
    return dayjs(date).format('MM/DD HH:mm')
  }

  updateMemo() {
    patientsStore
      .update({ ...this.patient, memo: this.memoValue })
      .then((patient) => {
        this.patient?.memo = patient.memo
        this.currentMemoValue = patient.memo
        this.isEditDisabled = true
      })
  }

  cancelMemo() {
    this.memoValue = this.currentMemoValue
    this.isEditDisabled = true
  }

  handleDisplayPatient(isDisplay) {
    patientsStore
      .update({ ...this.patient, display: isDisplay })
      .then((patient) => {
        this.patient?.display = patient.display
      })
  }
}
</script>

<style lang="scss" scoped>
.pageHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.pageTitle {
  font-size: 24px;
}
.patientContainer {
  background-color: $white;
  border: none;
  border-radius: 8px;
  overflow: hidden;
}
.patientHeader {
  padding: 32px;
}
.patentId {
  font-size: 20px;
  font-weight: bold;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 16px;
  fill: $gray-3;
}
.memo {
  display: inline-block;
  width: 15em;
  font-size: 20px;
}

.saveBtn {
  display: inline-block;
  padding: 8px 18px;
}

.monitoringTerm {
  font-size: 12px;
  color: $gray-3;
}
.isDataDisplay {
  display: inline-block;
  margin-left: 16px;
  font-size: 14px;
  color: $primary;
  text-decoration: underline;
  cursor: pointer;
}
.patientGraphLayout {
  padding: 0 32px;
}
.patientSummaryTitle {
  font-size: 16px;
  font-weight: bold;
  color: $gray-3;
  padding-top: 24px;
}
.patientSummaryItem {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  padding: 16px;
  border-bottom: 1px solid $gray-3;
  .unit {
    font-size: 14px;
  }
}
.symptomsHistory {
  padding: 32px;
}
</style>
