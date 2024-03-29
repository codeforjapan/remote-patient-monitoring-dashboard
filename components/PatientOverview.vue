<template>
  <tr
    :class="[
      'patientOverview',
      { outdated: isOutdated },
      { alerted: isAlertedSpO2 },
    ]"
  >
    <td>
      <div class="patientId">
        {{ patient.memo ? patient.memo : patient.patientId }}
      </div>
      <time class="date">
        開始日時<br />
        {{
          patient.policy_accepted ? getDate(patient.policy_accepted) : '--:--'
        }}
      </time>
      <br />
      <span
        v-if="patient.display"
        class="display"
        @click="$emit('click', { ...patient, display: false })"
      >
        非表示にする
      </span>
      <span
        v-else
        class="display"
        @click="$emit('click', { ...patient, display: true })"
      >
        表示する
      </span>
    </td>
    <td>
      <time>
        {{ lastStatus.created ? getDate(lastStatus.created) : '--:--' }}
      </time>
      <div class="withIconItem">
        <span :class="['icon', { alerted: isAlertedBodyTemperature }]">
          <TemperatureIcon />
        </span>
        {{ lastStatus.body_temperature.toFixed(1) }}
      </div>
      <div class="withIconItem">
        <span :class="['icon', { alerted: isAlertedPulse }]">
          <HeartIcon />
        </span>
        {{ lastStatus.pulse }}
      </div>
    </td>
    <td :class="['spo2', { alerted: isAlertedSpO2 }]">{{ lastStatus.SpO2 }}</td>
    <td class="graph">
      <div
        v-if="
          lastStatus.symptom.cough ||
          lastStatus.symptom.phlegm ||
          lastStatus.symptom.suffocation ||
          lastStatus.symptom.headache ||
          lastStatus.symptom.sore_throat ||
          lastStatus.symptom.malaise ||
          lastStatus.symptom.nausea ||
          lastStatus.symptom.diarrhea ||
          lastStatus.symptom.difficulty_eating ||
          lastStatus.symptom.no_urination
        "
        class="symptoms"
      >
        <SymptomsStatus
          class="symptomsItem"
          text="せき"
          :is-active="lastStatus.symptom.cough"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="たん"
          :is-active="lastStatus.symptom.phlegm"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="息苦しさ"
          :is-active="lastStatus.symptom.suffocation"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="頭痛"
          :is-active="lastStatus.symptom.headache"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="のどの痛み"
          :is-active="lastStatus.symptom.sore_throat"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="全身倦怠感"
          :is-active="lastStatus.symptom.malaise"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="嘔気・嘔吐"
          :is-active="lastStatus.symptom.nausea"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="下痢"
          :is-active="lastStatus.symptom.diarrhea"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="食事困難"
          :is-active="lastStatus.symptom.difficulty_eating"
        />
        <SymptomsStatus
          class="symptomsItem"
          text="半日排尿がない"
          :is-active="lastStatus.symptom.no_urination"
        />
      </div>
      <div><PatientOverviewGraph :patient="patient" /></div>
    </td>
    <td>
      <div class="detailButton">
        <ActionButton
          theme="text"
          size="S"
          :is-inline="true"
          :to="`/center/${patient.centerId}/patient/${patient.patientId}`"
        >
          <DetailIcon class="detailIcon" />
        </ActionButton>
      </div>
      <div class="remarksWrap">
        <template v-if="lastStatus.symptom.remarks">
          <p class="remarks">{{ lastStatus.symptom.remarks }}</p>
          <time class="date symptomDate">
            {{ lastStatus.created ? getDate(lastStatus.created) : '--:--' }}
          </time>
        </template>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { Patient } from '@/types/component-interfaces/patient'
import { Status } from '@/types/component-interfaces/status'
import SymptomsStatus from '@/components/SymptomsStatus.vue'
import TemperatureIcon from '@/static/icon-temperature.svg'
import HeartIcon from '@/static/icon-heart.svg'
import DetailIcon from '@/static/icon-detail.svg'
import ActionButton from '@/components/ActionButton.vue'

@Component({
  name: 'PatientOverview',
  components: {
    SymptomsStatus,
    TemperatureIcon,
    HeartIcon,
    DetailIcon,
    ActionButton,
  },
})
export default class PatientOverview extends Vue {
  outdatedDay = 1
  defaultStatus: Status | undefined = {
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
      malaise: false,
      nausea: false,
      diarrhea: false,
      difficulty_eating: false,
      no_urination: false,
      remarks: '',
    },
  }

  @Prop()
  patient!: Patient

  get lastStatus(): Status | undefined {
    return this.patient && this.patient.statuses.length > 0
      ? this.patient.statuses[0]
      : this.defaultStatus
  }

  get isOutdated(): boolean {
    const lastUpdated = dayjs(this.lastStatus?.created)
    const now = dayjs()
    return now.diff(lastUpdated, 'day') >= this.outdatedDay
  }

  get isAlertedSpO2(): boolean {
    return this.lastStatus
      ? this.lastStatus?.SpO2 <= this.$threshold.SpO2
      : false
  }

  get isAlertedBodyTemperature(): boolean {
    return this.lastStatus
      ? this.lastStatus?.body_temperature >= this.$threshold.bodyTemperature
      : false
  }

  get isAlertedPulse(): boolean {
    return this.lastStatus
      ? this.lastStatus?.pulse <= this.$threshold.pulseUnder ||
          this.lastStatus.pulse >= this.$threshold.pulseUpper
      : false
  }

  getDate(date: string): string {
    return dayjs(date).format('M/D (ddd) HH:mm')
  }
}
</script>

<style lang="scss" scoped>
.patientOverview {
  display: grid;
  grid-template-columns: 8em 6em 4em 1fr 23%;
  grid-template-rows: auto;
  font-size: 16px;
  td {
    display: block;
    align-self: center;
    padding: 0 8px;
  }
  &.outdated {
    background-color: $gray-1;
  }
  &.alerted {
    background-color: $bg-red;
  }
}
.patientId {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spo2 {
  font-size: 32px;
  font-weight: 600;
  &.alerted {
    color: $error;
  }
}
.statusItem {
  width: 100%;
  border-left: 1px solid $gray-3;
  padding-left: 12px;
}
.withIconItem {
  display: flex;
  align-items: center;
  .icon {
    flex: 0 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    text-align: center;
    svg {
      fill: $gray-3;
    }
    &.alerted {
      svg {
        fill: $error;
      }
    }
  }
}
.graph {
  position: relative;
}
.symptoms {
  position: absolute;
  top: 8px;
  right: 0;
  display: block;
  border: 1px solid $secondary;
  border-radius: 14px;
  font-size: 10px;
  padding: 0 8px;
  max-width: 70%;
}
.symptomsItem:not(:last-of-type)::after {
  content: '・';
  color: $gray-3;
}
.remarksWrap {
  min-height: 130px;
}
.remarks {
  margin: 6px 0;
}
.detailButton {
  text-align: right;
}
.detailIcon {
  fill: $gray-3;
}
.date {
  font-size: 13px;
  color: $gray-3;
}
.display {
  display: block;
  margin: 8px 0 0;
  color: $primary;
  text-decoration: underline;
  cursor: pointer;
}
.symptomDate {
  display: block;
  text-align: right;
  font-size: 13px;
}
</style>
