<template>
  <div>
    <PageHeader text="患者表示" :is-logged-in="true" />
    <SearchField
      class="searchField"
      :value="inputSearch"
      @input="inputSearch = $event"
    />
    <div class="patientContainer">
      <div class="patientHeader">
        <div>
          <span class="patentId">
            患者ID：000000001（
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
            モニタリング期間：2020/12/20 10:00〜現在
          </span>
        </div>
        <div class="buttonsContainer">
          <div class="buttonOuter">
            <ActionButton theme="primary" size="M" text="パスワードの再発行" />
          </div>
          <div class="buttonOuter">
            <ActionButton
              theme="error"
              size="M"
              text="この患者の情報を削除する"
            />
          </div>
        </div>
      </div>
      <div class="patientSummary">
        <dl class="patientSummaryList">
          <dt class="patientSummaryTitle">最終データ取得日時</dt>
          <dd class="patientSummaryItem">2020/12/27 22:00</dd>
          <dt class="patientSummaryTitle">SpO2</dt>
          <dd class="patientSummaryItem">96.2 <span class="unit">%</span></dd>
          <dt class="patientSummaryTitle">脈拍</dt>
          <dd class="patientSummaryItem">80 <span class="unit">bpm</span></dd>
        </dl>
        <PatientGraph />
      </div>
      <SymptomsHistory :items="items" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import ActionButton from '@/components/ActionButton.vue'
import SymptomsHistory from '@/components/SymptomsHistory.vue'
import EditIcon from '@/static/icon-edit.svg'
import SearchField from '@/components/SearchField.vue'

export default Vue.extend({
  name: 'Patient',
  components: {
    PageHeader,
    ActionButton,
    SymptomsHistory,
    EditIcon,
    SearchField,
  },
  data() {
    return {
      memo: 'Cさん',
      isEditDisabled: true,
      inputSearch: '',
      items: [
        {
          date: '12/27 9:00',
          isActiveCough: false,
          isActiveSputum: false,
          isActiveSuffocation: false,
          isActiveHeadache: false,
          isActiveThroat: true,
          other: 'のどが痛くなってきました。',
        },
        {
          date: '12/27 22:00',
          isActiveCough: true,
          isActiveSputum: true,
          isActiveSuffocation: false,
          isActiveHeadache: false,
          isActiveThroat: true,
          other: 'かなりせきがでるようになり、とてもつらいです。',
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
.searchField {
  margin-bottom: 16px;
}
.patientContainer {
  background-color: $white;
  border: 1px solid $gray-2;
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
  border-bottom: 1px solid $gray-2;
  .unit {
    font-size: 14px;
  }
}
</style>
