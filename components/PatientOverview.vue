<template>
  <tr
    :class="[
      'patientOverview',
      { outdated: isOutdated },
      { alerted: isAlerted },
    ]"
  >
    <td>
      <span>{{ patient.patientId }}</span>
      <br />
      <span class="date">{{ getDate(patient.policy_accepted) }}〜</span>
    </td>
    <td>{{ getDate(lastStatus.created) }}</td>
    <td class="spo2">{{ lastStatus.SpO2 }}</td>
    <td class="statusItem">
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
    <td class="graph"></td>
    <td class="symptoms">
      <SymptomsStatus class="symptomsItem" text="せき" :is-active="lastStatus.symptom.cough" />
      <SymptomsStatus class="symptomsItem" text="たん" :is-active="lastStatus.symptom.phlegm" />
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
      <p class="remarks">{{ lastStatus.symptom.remarks }}</p>
      <time class="date symptomDate">{{ getDate(lastStatus.created) }}</time>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { Patient } from '@/types/component-interfaces/patient'
import { Status } from '@/types/component-interfaces/status'
import SymptomsStatus from '@/components/SymptomsStatus.vue'
import TemperatureIcon from '@/static/icon-temperature.svg'
import HeartIcon from '@/static/icon-heart.svg'

export default Vue.extend({
  components: {
    SymptomsStatus,
    TemperatureIcon,
    HeartIcon,
  },
  props: {
    patient: {
      type: Object as () => Patient,
      default: () => ({
        patientId: '',
        centerId: '',
        policy_accepted: '',
        phone: '',
        display: true,
        statuses: [
          {
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
          },
        ],
      }),
    },
  },
  data(): {
    isOutdated: boolean
    isAlerted: boolean
  } {
    return {
      isOutdated: false,
      isAlerted: false,
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
.patientOverview {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 30% 24%;
  grid-template-rows: auto;
  font-size: 16px;
  td {
    align-self: center;
    justify-self: center;
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
.symptomsList {
  display: flex;
  margin: 0;
}
.symptomsItem:not(:last-of-type)::after {
  content: '・';
  color: $gray-3;
}
.remarks {
  font-size: 14px;
  margin: 6px 0;
}
.date {
  font-size: 14px;
  color: $gray-3;
}
.symptomDate {
  display: block;
  text-align: right;
}
</style>
