<template>
  <div class="patient-graph">
    <client-only>
      <Apexcharts type="line" :options="chartOptions" :series="series" />
    </client-only>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'PatientGraph',
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
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          inverseOrder: true,
        },
        colors: ['#FF8000', '#03AF7A', '#05A'],
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            show: true,
            rotate: -30,
            rotateAlways: true,
            formatter: (val) => {
              return dayjs(val).format('MM/DD')
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
              return dayjs(val).format('MM/DD HH:mm')
            },
          },
        },
        yaxis: [
          {
            seriesName: '脈拍',
            decimalsInFloat: 0,
            labels: {
              style: {
                colors: ['#FF8000'],
              },
            },
            min: 40,
            max: 150,
            crosshairs: {
              show: true,
              position: 'back',
            },
            tooltip: {
              enabled: true,
            },
            float: true,
          },
          {
            seriesName: '体温',
            decimalsInFloat: 1,
            labels: {
              style: {
                colors: ['#03AF7A'],
              },
            },
            min: 34,
            max: 40,
            crosshairs: {
              show: true,
              position: 'back',
            },
            tooltip: {
              enabled: true,
            },
            float: true,
          },
          {
            seriesName: 'SpO2',
            decimalsInFloat: 0,
            labels: {
              style: {
                colors: ['#05A'],
              },
            },
            min: 90,
            max: 100,
            crosshairs: {
              show: true,
              position: 'back',
            },
            tooltip: {
              enabled: true,
            },
            float: true,
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
.patient-graph {
  height: 100%;
  width: 100%;
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
