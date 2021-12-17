<template>
  <div class="patient-overview-graph">
    <client-only>
      <Apexcharts
        type="line"
        height="200px"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'PatientOverviewGraph',
  props: {
    patient: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'line',
          parentHeightOffset: 0,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          inverseOrder: true,
          fontSize: '11px',
          offsetY: 20,
        },
        colors: ['#FF8000', '#03AF7A', '#05A'],
        stroke: {
          curve: 'straight',
          width: 2,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            show: true,
            rotate: -30,
            rotateAlways: true,
            formatter: (val) => {
              return dayjs(val).format('M/D (ddd)')
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: true,
          },
          tooltip: {
            enabled: false,
          },
        },
        tooltip: {
          x: {
            formatter: (val) => {
              return dayjs(val).format('M/D (ddd) HH:mm')
            },
          },
        },
        yaxis: [
          {
            seriesName: '脈拍',
            decimalsInFloat: 0,
            float: true,
            tickAmount: 3,
            labels: {
              minWidth: 0,
              maxWidth: 40,
              style: {
                colors: ['#FF8000'],
              },
            },
            min: 40,
            max: 150,
          },
          {
            seriesName: '体温',
            decimalsInFloat: 1,
            float: true,
            tickAmount: 3,
            labels: {
              minWidth: 0,
              maxWidth: 40,
              offsetX: 15,
              style: {
                colors: ['#03AF7A'],
              },
            },
            min: 34,
            max: 40,
          },
          {
            seriesName: 'SpO2',
            decimalsInFloat: 0,
            float: true,
            tickAmount: 3,
            labels: {
              minWidth: 0,
              maxWidth: 40,
              offsetX: 30,
              style: {
                colors: ['#05A'],
              },
            },
            min: 80,
            max: 100,
          },
        ],
      },
    }
  },
  computed: {
    series() {
      const bodyTemperatures = this.patient.statuses.map((status) => {
        return {
          x: status.created,
          y: status.body_temperature.toFixed(1),
        }
      })
      const spO2s = this.patient.statuses.map((status) => {
        return {
          x: status.created,
          y: status.SpO2,
        }
      })
      const pulses = this.patient.statuses.map((status) => {
        return {
          x: status.created,
          y: status.pulse,
        }
      })

      return [
        { name: '脈拍', data: pulses },
        { name: '体温', data: bodyTemperatures },
        { name: 'SpO2', data: spO2s },
      ]
    },
  },
}
</script>

<style lang="scss">
.patient-overview-graph {
  &__y-axis {
    &__title {
      &__body-tempreture {
        width: 0;
        &::before {
          content: '体温' !important;
          width: 100% !important;
        }
      }
    }
  }
}
</style>
