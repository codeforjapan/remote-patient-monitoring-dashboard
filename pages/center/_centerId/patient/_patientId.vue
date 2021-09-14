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
          <div>
            <span class="patentId">
              患者メモ：
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
          <div v-if="!patient.memo">患者ID：{{ patient.patientId }}</div>
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
        <div class="actionButtons">
          <ActionButton
            class="button"
            theme="primary"
            size="S"
            :is-inline="true"
            @click="showModalRecord = true"
          >
            <PlusIcon />
            体調を記録
          </ActionButton>
          <ActionButton
            class="button"
            theme="outline"
            size="S"
            :is-inline="true"
            @click="showModalDownload = true"
          >
            <DownloadIcon class="downloadIcon" />
            ダウンロード
          </ActionButton>
        </div>
      </div>
      <div class="patientGraphLayout">
        <PatientGraph :patient="patient" />
      </div>
      <SymptomsHistory
        class="symptomsHistory"
        :patient-id="patient.patientId"
        :statuses="patient.statuses"
        @on-deleted="load"
      />
      <ModalBase :show="showModalDownload" @close="closeModalDownload">
        <h2>患者データをダウンロード</h2>
        <p>
          患者の記録データをCSV形式に変換しファイルをzip形式に圧縮します。ダウンロードファイルのパスワード設定をしてください。
        </p>
        <div class="inputContainer">
          <InputField
            v-model="zipPassword"
            type="password"
            label="パスワード"
            placeholder="8文字以上"
            :rule-length="8"
            required
            class="passwordField"
          />
          <InputField
            v-model="zipPasswordReEnter"
            type="password"
            label="パスワードの再入力"
            placeholder="8文字以上"
            :rule-length="8"
            required
            class="passwordField"
          />
        </div>
        <ActionButton
          :theme="downloadBtnTheme"
          size="L"
          :is-submittable="isDownloadable"
          @click="downloadZip"
        >
          ダウンロードを開始する
        </ActionButton>
      </ModalBase>
      <ModalBase wide :show="showModalRecord" @close="closeModalRecord">
        <h2>体調を記録する</h2>
        <form name="form">
          <ul class="conditionList">
            <li class="conditionItem">
              <InputField
                v-model="inputDateTime"
                type="datetime-local"
                label="記録日時"
                name="datetime"
              />
            </li>
            <li class="conditionItem">
              <InputNumberField
                id="temperature"
                :key="`temperature-${recordElementKey}`"
                v-model="inputTemperature"
                name="temperature"
                label="体温"
                unit="℃"
                placeholder="36.5"
                required
                floating-point
                temperature
                :step="0.1"
                rules="required"
              />
            </li>
            <li class="conditionItem">
              <InputNumberField
                id="spo2"
                :key="`spo2-${recordElementKey}`"
                v-model="inputSpO2"
                name="spo2"
                label="酸素飽和度(SpO2)"
                unit="％"
                placeholder="98"
                required
                spo2
                rules="required"
              />
            </li>
            <li class="conditionItem">
              <InputNumberField
                id="pulse"
                :key="`pulse-${recordElementKey}`"
                v-model="inputPulse"
                name="pulse"
                label="脈拍"
                unit="bpm"
                placeholder="80"
                required
                pulse
                value="inputPulse"
                rules="required"
              />
            </li>
          </ul>
          <section class="symptomsSection">
            <h3>該当の症状はありますか？</h3>
            <ul class="symptomsList">
              <li
                v-for="(item, index) in symptomItems"
                :key="index"
                class="symptomsItem"
              >
                <CheckboxField
                  :key="`checkbox-${index}-${recordElementKey}`"
                  v-model="inputSymptom[item.label]"
                  :name="item.name"
                  :label="item.label"
                  :value="item.name"
                  @input="itemSelectControl"
                />
              </li>
            </ul>
            <InputField
              v-model="inputSymptom.remarks"
              label="上記以外の体調の変化"
              name="memo"
              placeholder="例：昨日の20時ごろから咳が止まらない"
            />
          </section>
          <p v-if="formMessage">
            {{ formMessage }}
          </p>
          <div class="buttonContainer">
            <ActionButton
              :theme="recordBtnTheme"
              size="L"
              :is-submittable="isSubmittable"
              :is-inline="true"
              @click="submitRecord"
            >
              記録する
            </ActionButton>
          </div>
        </form>
      </ModalBase>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import * as zip from '@zip.js/zip.js/dist/zip'
import { Patient } from '@/types/component-interfaces/patient'
import { ConsumeStatus } from '@/types/component-interfaces/status'
import ActionButton from '@/components/ActionButton.vue'
import CheckboxField from '@/components/CheckboxField.vue'
import SymptomsHistory from '@/components/SymptomsHistory.vue'
import InputField from '@/components/InputField.vue'
import InputNumberField from '@/components/InputNumberField.vue'
import ModalBase from '@/components/ModalBase.vue'
import EditIcon from '@/static/icon-edit.svg'
import SaveIcon from '@/static/icon-save.svg'
import CloseIcon from '@/static/icon-close.svg'
import PlusIcon from '@/static/icon-plus.svg'
import DownloadIcon from '@/static/icon-download.svg'
import { patientsStore, statusesStore } from '@/store'

type SymptomItem = {
  name: string
  label: string
}
@Component({
  name: 'patientId',
  components: {
    ActionButton,
    CheckboxField,
    SymptomsHistory,
    InputField,
    InputNumberField,
    ModalBase,
    EditIcon,
    SaveIcon,
    CloseIcon,
    PlusIcon,
    DownloadIcon,
  },
})
export default class PatientId extends Vue {
  inputDateTime = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
  loading = false
  createdStatus = false
  formMessage = ''
  isEditDisabled = true
  currentMemoValue = ''
  showModalRecord = false
  recordElementKey = 0
  showModalDownload = false
  zipPassword = ''
  zipPasswordReEnter = ''
  patient: Patient = {
    patientId: '',
    centerId: '',
    policy_accepted: '',
    phone: '',
    memo: '',
    display: true,
    statuses: [],
  }

  inputSpO2 = ''
  inputPulse = ''
  inputTemperature = ''
  inputSymptom = {
    cough: false,
    phlegm: false,
    suffocation: false,
    headache: false,
    sore_throat: false,
    remarks: '',
  }

  symptomItems: SymptomItem[] = [
    {
      name: 'cough',
      label: 'せき',
    },
    {
      name: 'phlegm',
      label: 'たん',
    },
    {
      name: 'suffocation',
      label: '息苦しさ',
    },
    {
      name: 'headache',
      label: '頭痛',
    },
    {
      name: 'sore_throat',
      label: 'のど痛み',
    },
  ]

  created() {
    this.load()
  }

  get centerId() {
    return this.$route.params.centerId
  }

  get memoValue() {
    return patientsStore.getPatientMemo
  }

  set memoValue(value) {
    patientsStore.setPatient(value || '')
  }

  get status(): ConsumeStatus {
    return {
      created: this.inputDateTime,
      SpO2: +this.inputSpO2,
      body_temperature: +this.inputTemperature,
      pulse: +this.inputPulse,
      symptom: {
        cough: this.inputSymptom.cough,
        phlegm: this.inputSymptom.phlegm,
        suffocation: this.inputSymptom.suffocation,
        headache: this.inputSymptom.headache,
        sore_throat: this.inputSymptom.sore_throat,
        remarks: this.inputSymptom.remarks,
      },
    }
  }

  get isSubmittable(): boolean {
    return (
      this.status.body_temperature > 0 &&
      this.status.SpO2 > 0 &&
      Number.isInteger(this.status.SpO2) &&
      this.status.pulse > 0 &&
      Number.isInteger(this.status.pulse)
    )
  }

  get recordBtnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }

  get isDownloadable(): boolean {
    return (
      this.zipPassword !== '' &&
      this.zipPasswordReEnter !== '' &&
      this.zipPassword.length >= 8 &&
      this.zipPassword.length >= 8 &&
      this.zipPassword === this.zipPasswordReEnter
    )
  }

  get downloadBtnTheme(): string {
    return this.isDownloadable ? 'primary' : 'disable'
  }

  async load() {
    await patientsStore
      .loadPatient(this.$route.params.patientId)
      .then((patient) => {
        this.patient = patient
        this.currentMemoValue = patient.memo || ''
      })
  }

  getDate(date: string): string {
    return dayjs(date).format('M/D (ddd) HH:mm')
  }

  updateMemo() {
    patientsStore
      .update({ ...this.patient, memo: this.memoValue })
      .then((patient) => {
        this.patient.memo = patient.memo
        this.currentMemoValue = patient.memo || ''
        this.isEditDisabled = true
      })
  }

  cancelMemo() {
    this.memoValue = this.currentMemoValue
    this.isEditDisabled = true
  }

  handleDisplayPatient(isDisplay: boolean) {
    patientsStore
      .update({ ...this.patient, display: isDisplay })
      .then((patient) => {
        this.patient.display = patient.display
      })
  }

  itemSelectControl(checked: boolean, value: string): void {
    this.inputSymptom[
      value as 'cough' | 'phlegm' | 'suffocation' | 'headache' | 'sore_throat'
    ] = checked
  }

  submitRecord(): void {
    if (this.isSubmittable) {
      this.loading = true
      statusesStore
        .create({ patientId: this.patient.patientId, status: this.status })
        .then(
          () => {
            this.formMessage = '体調記録を登録しました'
            this.createdStatus = true
            this.clearRecordValue()
            this.recordElementKey++
          },
          (error) => {
            this.loading = false
            this.formMessage = error
          },
        )
    }
  }

  clearRecordValue(): void {
    this.inputDateTime = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
    this.inputSpO2 = ''
    this.inputPulse = ''
    this.inputTemperature = ''
    this.inputSymptom = {
      cough: false,
      phlegm: false,
      suffocation: false,
      headache: false,
      sore_throat: false,
      remarks: '',
    }
  }

  async downloadZip() {
    if (this.isDownloadable) {
      const data = this.patient.statuses.map((item) => {
        return {
          記録日時: dayjs(item.created).format('YYYY-MM-DDTHH:mm:ss+09:00'),
          SpO2: item.SpO2,
          体温: item.body_temperature,
          脈拍: item.pulse,
          せき: item.symptom?.cough ? 1 : 0,
          たん: item.symptom?.phlegm ? 1 : 0,
          息苦しさ: item.symptom?.suffocation ? 1 : 0,
          頭痛: item.symptom?.headache ? 1 : 0,
          のど痛み: item.symptom?.sore_throat ? 1 : 0,
          その他の体調の変化: item.symptom?.remarks,
        }
      })
      const csv = Papa.unparse(data, {
        delimiter: ',',
      })
      const now = new Date()
      const formattedNowDate = dayjs(now).format('YYYYMMDD_HHmm')
      const inputBlob = new Blob([csv], { type: 'text/csv' })
      const zipWriter = new zip.ZipWriter(new zip.BlobWriter('application/zip'))
      await zipWriter.add(
        `${this.patient.phone}_${this.patient.memo}.csv`,
        new zip.BlobReader(inputBlob),
        { password: this.zipPassword },
      )
      const blob = await zipWriter.close()
      saveAs(blob, `patient_${formattedNowDate}.zip`)
    }
  }

  async closeModalRecord() {
    this.showModalRecord = false
    this.formMessage = ''
    this.clearRecordValue()
    if (this.createdStatus) {
      await this.load()
      this.createdStatus = false
    }
  }

  closeModalDownload(): void {
    this.showModalDownload = false
    this.zipPassword = ''
    this.zipPasswordReEnter = ''
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
  display: flex;
  justify-content: space-between;
  padding: 32px;
}
.patentId {
  font-size: 20px;
  font-weight: 600;
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
.actionButtons {
  display: flex;
  .button {
    margin-left: 20px;
  }
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
  font-weight: 600;
  color: $gray-3;
  padding-top: 24px;
}
.patientSummaryItem {
  font-size: 24px;
  font-weight: 600;
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
.inputContainer {
  margin: 30px 0;
}
.passwordField {
  margin-bottom: 30px;
}
.downloadIcon {
  fill: none !important;
  vertical-align: text-bottom;
}
.conditionList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.conditionItem {
  flex: 0 1 48%;
}
.symptomsSection {
  margin-bottom: 30px;
}
.symptomsList {
  display: flex;
  justify-content: space-between;
}
.symptomsItem {
  flex: 0 1 18%;
}
.buttonContainer {
  margin: 15px 0;
  text-align: center;
}
</style>
