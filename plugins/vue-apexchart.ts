import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import 'promise-polyfill/src/polyfill'
import 'classlist-polyfill'
import 'dayjs/locale/ja'
import dayjs from 'dayjs'

dayjs.locale('ja')
Vue.component('Apexcharts', VueApexCharts)
