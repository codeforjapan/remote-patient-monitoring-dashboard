<template>
  <div>
    <div class="pageHeader">
      <h2 class="pageTitle">患者データ</h2>
      <ActionButton
        theme="outline"
        class="backBtn"
        size="M"
        :is-inline="true"
        @click="$emit('click-register')"
      >
        <NuxtLink class="detailItem" to="/">一覧に戻る</NuxtLink>
      </ActionButton>
    </div>
    <div class="patientContainer">
      <div class="patientHeader">
        <div>
          <span class="patentId">
            患者ID：{{ patient.patientId }}
            <EditIcon
              :class="['editIcon', { editable: !isEditDisabled }]"
              @click="isEditDisabled = !isEditDisabled"
            />
          </span>
          <span>
            <input
              v-model="memo"
              class="memo"
              type="text"
              :disabled="isEditDisabled"
            />
            <ActionButton
              class="saveBtn"
              theme="primary"
              size="M"
              :is-inline="true"
              @click="isEditDisabled = !isEditDisabled"
            >
              保存
            </ActionButton>
          </span>
        </div>
        <div>
          <span class="monitoringTerm">
            モニタリング開始：{{ getDate(patient.policy_accepted) }}
          </span>
          <span class="dataHide"> 患者データを非表示にする </span>
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
import { Status } from '@/types/component-interfaces/status'
import ActionButton from '@/components/ActionButton.vue'
import SymptomsHistory from '@/components/SymptomsHistory.vue'
import EditIcon from '@/static/icon-edit.svg'
import { patientsStore } from '@/store'

@Component({
  name: 'patientId',
  components: {
    ActionButton,
    SymptomsHistory,
    EditIcon,
    // ToggleSwitch,
  },
})
export default class PatientId extends Vue {
  memo = ''
  isEditDisabled = true
  patient: Patient | undefined = {
    patientId: '',
    centerId: '',
    policy_accepted: '',
    phone: '',
    display: true,
    statuses: [],
  }

  lastStatus: Status | undefined = {
    statusId: '',
    patientId: '',
    centerId: '',
    created: '',
    SpO2: 0,
    body_temperature: 0,
    pulse: 0,
    symptom: {
      symptomId: '',
      cough: false,
      phlegm: false,
      suffocation: false,
      headache: false,
      sore_throat: false,
      remarks: '',
    },
  }

  created() {
    if (patientsStore.getPatients.length > 0) {
      this.patient = patientsStore.getPatients.find(
        (patient) => patient.patientId === this.$route.params.patientId,
      )
      this.getLastStatus()
    } else {
      patientsStore
        .loadPatient(this.$route.params.patientId)
        .then((patient) => {
          this.patient = patient
          this.getLastStatus()
        })
    }
  }

  getLastStatus(): void {
    this.lastStatus =
      this.patient && this.patient.statuses.length > 0
        ? this.patient.statuses[0]
        : this.lastStatus
  }

  getDate(date: string): string {
    return dayjs(date).format('MM/DD HH:mm')
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
.backBtn {
  padding: 12.8px 40px;
}
.patientContainer {
  background-color: $white;
  border: none;
  border-radius: 8px;
  overflow: hidden;
}
.patientHeader {
  //display: flex;
  //justify-content: space-between;
  padding: 32px;
}
.patentId {
  font-size: 20px;
  font-weight: bold;
}
.editIcon {
  display: inline-block;
  margin-left: 16px;
  fill: $gray-3;
  &.editable {
    fill: $link;
  }
}
.memo {
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  padding: 5px 0;
}

.saveBtn {
  display: inline-block;
  padding: 8px 18px;
}

.monitoringTerm {
  font-size: 12px;
  color: $gray-3;
}
.dataHide {
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
