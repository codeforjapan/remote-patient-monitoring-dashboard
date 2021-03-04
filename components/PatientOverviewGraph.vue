<template>
  <div class="patient-overview-graph">
    <client-only>
      <Apexcharts
        type="line"
        height="130px"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'PatientOverviewGraph',
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
          animations: {
            easing: 'linear',
            dynamicAnimation: {
              speed: 100,
            },
          },
        },
        legend: {
          show: false,
        },
        colors: ['#FF8000', '#03AF7A', '#05A'],
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        tooltip: {
          enabled: true,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: true,
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
            title: {
              enabled: false,
              show: false,
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
              style: {
                colors: ['#03AF7A'],
              },
            },
            title: {
              enabled: false,
              show: false,
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
              style: {
                colors: ['#05A'],
              },
            },
            title: {
              enabled: false,
              show: false,
            },
            min: 90,
            max: 100,
          },
        ],
      },
      series: [
        {
          name: '脈拍',
          data: [
            120,
            132,
            121,
            104,
            99,
            96,
            84,
            90,
            100,
            104,
            105,
            104,
            123,
            110,
            130,
          ],
        },
        {
          name: '体温',
          data: [
            35.4,
            35.0,
            36.0,
            36.4,
            36.6,
            36.9,
            37.5,
            36.4,
            36.5,
            36.3,
            37.2,
            37.5,
            38.5,
            37.5,
            36.5,
          ],
        },
        {
          name: 'SpO2',
          data: [99, 98, 96, 97, 96, 97, 98, 99, 100, 100, 97, 98, 99, 96, 95],
        },
      ],
    }
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
