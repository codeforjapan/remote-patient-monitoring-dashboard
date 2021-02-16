<template>
  <div>
    <PageHeader text="患者表示" :is-logged-in="true" />
    <div class="patientContainer">
      <div class="patientHeader">
        <div>
          <span class="patentId">
            患者ID：{{ patient.patientId }}（
            <input
              v-model="memo"
              class="memo"
              type="text"
              :disabled="isEditDisabled"
            />
            <EditIcon
              :class="['editIcon', { editable: !isEditDisabled }]"
              @click="isEditDisabled = !isEditDisabled"
            />
            ）
          </span>
          <br />
          <span class="monitoringTerm">
            モニタリング期間：{{ getDate(patient.policy_accepted) }}〜現在
          </span>
        </div>
        <div>
          <ToggleSwitch
            v-model="patient.display"
            name="displayInDashboard"
            label="ダッシュボード表示"
          />
        </div>
        <div class="buttonsContainer">
          <div class="buttonOuter">
            <ActionButton theme="primary" size="M">
              パスワードの再発行
            </ActionButton>
          </div>
          <div class="buttonOuter">
            <ActionButton theme="error" size="M">
              この患者の情報を削除する
            </ActionButton>
          </div>
        </div>
      </div>
      <div class="patientSummary">
        <dl class="patientSummaryList">
          <dt class="patientSummaryTitle">最終データ取得日時</dt>
          <dd class="patientSummaryItem">{{ getDate(lastStatus.created) }}</dd>
          <dt class="patientSummaryTitle">SpO2</dt>
          <dd class="patientSummaryItem">
            {{ lastStatus.SpO2 }} <span class="unit">%</span>
          </dd>
          <dt class="patientSummaryTitle">脈拍</dt>
          <dd class="patientSummaryItem">
            {{ lastStatus.pulse }} <span class="unit">bpm</span>
          </dd>
        </dl>
        <PatientGraph />
      </div>
      <SymptomsHistory :statuses="patient.statuses" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { Status } from '@/types/component-interfaces/status'
import PageHeader from '@/components/PageHeader.vue'
import ActionButton from '@/components/ActionButton.vue'
import SymptomsHistory from '@/components/SymptomsHistory.vue'
import EditIcon from '@/static/icon-edit.svg'
import ToggleSwitch from '@/components/ToggleSwitch.vue'

export default Vue.extend({
  name: 'Patient',
  components: {
    PageHeader,
    ActionButton,
    SymptomsHistory,
    EditIcon,
    ToggleSwitch,
  },
  data() {
    return {
      memo: 'Cさん',
      isEditDisabled: true,
      patient: {
        patientId: 'string',
        centerId: 'string',
        policy_accepted: '2021-01-17T08:49:48.866Z',
        phone: 'string',
        display: true,
        statuses: [
          {
            statusId: 'string',
            patientId: 'string',
            centerId: 'string',
            created: '2021-01-17T08:49:48.866Z',
            SpO2: 0,
            body_temperature: 0,
            pulse: 0,
            symptom: {
              symptomId: 'string',
              cough: true,
              phlegm: true,
              suffocation: true,
              headache: true,
              sore_throat: true,
              remarks: 'string',
            },
          },
        ],
      },
    }
  },
  computed: {
    lastStatus(): Status {
      return this.patient.statuses[this.patient.statuses.length - 1]
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
.searchField {
  margin-bottom: 16px;
}
.patientContainer {
  background-color: $white;
  border: 1px solid $gray-3;
  border-radius: 8px;
  overflow: hidden;
}
.patientHeader {
  display: flex;
  justify-content: space-between;
  padding: 32px;
}
.patentId,
.memo {
  font-size: 20px;
  font-weight: bold;
}
.editIcon {
  fill: $link;
  &.editable {
    fill: $gray-3;
  }
}
.monitoringTerm {
  font-size: 12px;
  color: $gray-3;
}
.buttonsContainer {
  flex: 0 0 38%;
  display: flex;
  align-items: center;
}
.buttonOuter {
  flex: 0 0 45%;
  margin-right: 5%;
  height: 100%;
  button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.5em 1em;
  }
}
.patientSummary {
  display: flex;
}
.patientSummaryList {
  text-align: center;
  margin-right: 30px;
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
</style>
