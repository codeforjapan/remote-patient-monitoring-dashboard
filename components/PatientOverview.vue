<template>
  <tr
    :class="[
      'patientOverview',
      { outdated: isOutdated },
      { alerted: isAlerted },
    ]"
  >
    <td>
      <span>{{ patient.memo ? patient.memo : patient.patientId }}</span>
      <br />
      <time class="date">
        {{
          patient.policy_accepted ? getDate(patient.policy_accepted) : '--:--'
        }}〜
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
        <span class="icon">
          <TemperatureIcon />
        </span>
        {{ lastStatus.body_temperature.toFixed(1) }}
      </div>
      <div class="withIconItem">
        <span class="icon">
          <HeartIcon />
        </span>
        {{ lastStatus.pulse }}
      </div>
    </td>
    <td class="spo2">{{ lastStatus.SpO2 }}</td>
    <td class="graph">
      <div
        v-if="
          lastStatus.symptom.cough ||
          lastStatus.symptom.phlegm ||
          lastStatus.symptom.suffocation ||
          lastStatus.symptom.headache ||
          lastStatus.symptom.sore_throat
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
          text="のど痛み"
          :is-active="lastStatus.symptom.sore_throat"
        />
      </div>
      <div><PatientOverviewGraph :patient="patient" /></div>
    </td>
    <td>
      <p class="remarks">{{ lastStatus.symptom.remarks }}</p>
      <time class="date symptomDate">
        {{ lastStatus.created ? getDate(lastStatus.created) : '--:--' }}
      </time>
    </td>
    <td class="detail">
      <ActionButton
        theme="outline"
        size="S"
        :is-inline="true"
        :to="`/patient/${patient.patientId}`"
      >
        詳細をみる
      </ActionButton>
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
import ActionButton from '@/components/ActionButton.vue'

@Component({
  name: 'PatientOverview',
  components: {
    SymptomsStatus,
    TemperatureIcon,
    HeartIcon,
    ActionButton,
  },
})
export default class PatientOverview extends Vue {
  isOutdated = false
  isAlerted = false
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
      remarks: '',
    },
  }

  @Prop()
  patient: Patient | undefined

  get lastStatus(): Status | undefined {
    return this.patient && this.patient.statuses.length > 0
      ? this.patient.statuses[0]
      : this.defaultStatus
  }

  getDate(date: string): string {
    return dayjs(date).format('MM/DD HH:mm')
  }
}
</script>

<style lang="scss" scoped>
.patientOverview {
  display: grid;
  grid-template-columns: 8em 8em 6em 1fr 13% 8em;
  grid-template-rows: auto;
  font-size: 16px;
  td {
    align-self: center;
    padding: 0 16px;
  }
  &.outdated {
    background-color: $gray-1;
  }
  &.alerted {
    background-color: $bg-red;
  }
}
.spo2 {
  font-size: 32px;
  font-weight: bold;
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
  }
}
.graph {
  text-align: right;
}
.symptoms {
  display: inline-block;
  border: 1px solid $secondary;
  border-radius: 14px;
  font-size: 10px;
  padding: 0 8px;
}
.symptomsItem:not(:last-of-type)::after {
  content: '・';
  color: $gray-3;
}
.remarks {
  margin: 6px 0;
}
.detail {
  text-align: center;
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
