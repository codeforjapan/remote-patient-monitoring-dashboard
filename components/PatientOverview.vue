<template>
  <tr
    :class="[
      'patientOverview',
      { outdated: isOutdated },
      { alerted: isAlerted },
    ]"
  >
    <td class="patientId">
      <span>{{ patientId.id }}</span>
      <br />
      <span>{{ patientId.nickname }}</span>
    </td>
    <td class="lastUpdate">{{ lastUpdate }}</td>
    <td class="temperature">{{ temperature.toFixed(1) }}</td>
    <td class="pulse">{{ pulse }}</td>
    <td class="spo2">{{ spo2.toFixed(1) }}</td>
    <td class="graph"></td>
    <td class="symptoms">
      <ul class="symptomsList">
        <li class="symptomsItem">
          <SymptomsStatus text="せき" :is-active="isActiveCough" />
        </li>
        <li class="symptomsItem">
          <SymptomsStatus text="たん" :is-active="isActiveSputum" />
        </li>
        <li class="symptomsItem">
          <SymptomsStatus text="息苦しさ" :is-active="isActiveSuffocation" />
        </li>
        <li class="symptomsItem">
          <SymptomsStatus text="頭痛" :is-active="isActiveHeadache" />
        </li>
        <li class="symptomsItem">
          <SymptomsStatus text="のど痛" :is-active="isActiveThroat" />
        </li>
        <li class="symptomsItem">
          <SymptomsStatus text="その他" :is-active="isActiveOther" />
        </li>
      </ul>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import SymptomsStatus from '@/components/SymptomsStatus.vue'

type PatientId = {
  id: string
  nickname: string
}

export default Vue.extend({
  components: {
    SymptomsStatus,
  },
  props: {
    patientId: {
      type: Object as () => PatientId,
      default: () => ({
        id: '',
        nickname: '',
      }),
    },
    lastUpdate: {
      type: String,
      default: '',
    },
    temperature: {
      type: Number,
      default: 0,
    },
    pulse: {
      type: Number,
      default: 0,
    },
    spo2: {
      type: Number,
      default: 0,
    },
    isActiveCough: {
      type: Boolean,
      default: false,
    },
    isActiveSputum: {
      type: Boolean,
      default: false,
    },
    isActiveSuffocation: {
      type: Boolean,
      default: false,
    },
    isActiveHeadache: {
      type: Boolean,
      default: false,
    },
    isActiveThroat: {
      type: Boolean,
      default: false,
    },
    isActiveOther: {
      type: Boolean,
      default: false,
    },
    isOutdated: {
      type: Boolean,
      default: false,
    },
    isAlerted: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.patientOverview {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 30% 24%;
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
.symptomsList {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}
.symptomsItem {
  flex: 0 0 calc(100% / 3);
}
</style>
