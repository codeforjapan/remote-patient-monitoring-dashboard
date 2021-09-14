<template>
  <section>
    <table class="symptomsHistoryTable">
      <thead>
        <tr class="symptomsHistoryRow symptomsHistoryHeader">
          <th>記録日時</th>
          <th>SpO2</th>
          <th>体温</th>
          <th>脈拍</th>
          <th class="alignLeft" style="padding-left: 20px">症状</th>
          <th class="alignLeft">その他の体調の変化</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in statuses"
          :key="index"
          class="symptomsHistoryRow"
        >
          <td>{{ getDate(item.created) }}</td>
          <td
            :class="['alignCenter spo2', { alerted: isAlertedSpO2(item.SpO2) }]"
          >
            {{ item.SpO2 }}
          </td>
          <td
            :class="[
              'alignCenter',
              { alerted: isAlertedBodyTemperature(item.body_temperature) },
            ]"
          >
            {{ item.body_temperature.toFixed(1) }}
          </td>
          <td :class="['alignCenter', { alerted: isAlertedPulse(item.pulse) }]">
            {{ item.pulse }}
          </td>
          <td>
            <div class="symptoms">
              <SymptomsStatusText
                text="せき"
                :is-active="item.symptom.cough"
              />・
              <SymptomsStatusText
                text="たん"
                :is-active="item.symptom.phlegm"
              />・
              <SymptomsStatusText
                text="息苦しさ"
                :is-active="item.symptom.suffocation"
              />・
              <SymptomsStatusText
                text="頭痛"
                :is-active="item.symptom.headache"
              />・
              <SymptomsStatusText
                text="のど痛み"
                :is-active="item.symptom.sore_throat"
              />
            </div>
          </td>
          <td>{{ item.symptom.remarks }}</td>
          <td>
            <DeleteIcon class="icon" @click="showDeleteModal(item.statusId)" />
          </td>
        </tr>
      </tbody>
    </table>
    <ModalBase :show="showModal" @close="closeDeleteModal">
      <h2>記録を削除する</h2>
      <p>この記録を削除してもよろしいですか？</p>
      <div class="buttonContainer">
        <ActionButton
          class="button"
          theme="primary"
          size="L"
          @click="deleteStatus(targetDeleteStatusId)"
        >
          はい
        </ActionButton>
        <ActionButton
          class="button"
          theme="outline"
          size="L"
          @click="closeDeleteModal"
        >
          いいえ
        </ActionButton>
      </div>
      <p v-if="message">{{ message }}</p>
    </ModalBase>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { Status } from '@/types/component-interfaces/status'
import SymptomsStatusText from '@/components/SymptomsStatusText.vue'
import ModalBase from '@/components/ModalBase.vue'
import DeleteIcon from '@/static/icon-delete.svg'
import { statusesStore } from '@/store'

@Component({
  components: {
    SymptomsStatusText,
    ModalBase,
    DeleteIcon,
  },
})
export default class SymptomsHistory extends Vue {
  message = ''
  showModal = false
  targetDeleteStatusId = ''

  @Prop()
  patientId!: string

  @Prop({ default: [] })
  statuses!: Status[]

  isAlertedSpO2(value: number): boolean {
    return value ? value <= this.$threshold.SpO2 : false
  }

  isAlertedBodyTemperature(value: number): boolean {
    return value ? value >= this.$threshold.bodyTemperature : false
  }

  isAlertedPulse(value: number): boolean {
    return value
      ? value <= this.$threshold.pulseUnder ||
          value >= this.$threshold.pulseUpper
      : false
  }

  getDate(date: string): string {
    return dayjs(date).format('M/D (ddd) HH:mm')
  }

  showDeleteModal(id: string): void {
    this.showModal = true
    this.targetDeleteStatusId = id
  }

  closeDeleteModal(): void {
    this.showModal = false
    this.targetDeleteStatusId = ''
  }

  deleteStatus(id: string): void {
    statusesStore
      .delete({ patientId: this.patientId, statusId: id })
      .then((result) => {
        if (result === true) {
          this.showModal = false
          this.targetDeleteStatusId = ''
          this.$emit('on-deleted')
        } else {
          this.message = `削除に失敗しました。${result}`
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.symptomsHistoryTitle {
  font-size: 24px;
  margin: 32px;
}
.symptomsHistoryTable {
  width: 100%;
  font-size: 16px;
  tbody tr {
    border-bottom: 1px solid $gray-1;
    padding: 16px 0;
  }
}
.symptomsHistoryRow {
  display: grid;
  grid-template-columns: 9em 5em 5em 5em 1fr 28% 2em;
  grid-template-rows: auto;
  padding: 0 12px 0 0;
  td,
  th {
    display: block;
    align-self: center;
    padding: 0 4px;
    &.alignCenter {
      text-align: center;
    }
    &.alignLeft {
      text-align: left;
    }
  }
}
.symptomsHistoryHeader {
  color: $gray-2;
}
.spo2 {
  font-size: 22px;
}
.symptoms {
  color: $gray-2;
  padding: 0 1em;
}
.alerted {
  color: $error;
}
.icon {
  cursor: pointer;
  fill: $gray-2;
}
.buttonContainer {
  display: flex;
  justify-content: space-between;
  margin: 40px 0 30px;
}
.button {
  flex: 0 0 46%;
}
</style>
