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
        <div>
          <ActionButton
            theme="outline"
            size="S"
            :is-inline="true"
            @click="showModal = true"
          >
            <DownloadIcon class="downloadIcon" />
            ダウンロード
          </ActionButton>
        </div>
      </div>
      <div class="patientGraphLayout">
        <PatientGraph :patient="patient" />
      </div>
      <SymptomsHistory class="symptomsHistory" :statuses="patient.statuses" />
      <ModalBase :show="showModal" @close="closeModal">
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
import ActionButton from '@/components/ActionButton.vue'
import SymptomsHistory from '@/components/SymptomsHistory.vue'
import InputField from '@/components/InputField.vue'
import ModalBase from '@/components/ModalBase.vue'
import EditIcon from '@/static/icon-edit.svg'
import SaveIcon from '@/static/icon-save.svg'
import CloseIcon from '@/static/icon-close.svg'
import DownloadIcon from '@/static/icon-download.svg'
import { patientsStore } from '@/store'

@Component({
  name: 'patientId',
  components: {
    ActionButton,
    SymptomsHistory,
    InputField,
    ModalBase,
    EditIcon,
    SaveIcon,
    CloseIcon,
    DownloadIcon,
  },
})
export default class PatientId extends Vue {
  isEditDisabled = true
  currentMemoValue = ''
  showModal = false
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

  created() {
    patientsStore.loadPatient(this.$route.params.patientId).then((patient) => {
      this.patient = patient
      this.currentMemoValue = patient.memo || ''
    })
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
          症状備考: item.symptom?.remarks,
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

  closeModal(): void {
    this.showModal = false
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
</style>
