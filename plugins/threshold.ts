import { Plugin } from '@nuxt/types'

interface Threshold {
  SpO2: number
  bodyTemperature: number
  pulseUnder: number
  pulseUpper: number
}

const plugin: Plugin = function (_, inject) {
  const threshold: Threshold = {
    SpO2: 90,
    bodyTemperature: 37.5,
    pulseUnder: 60,
    pulseUpper: 100,
  }

  inject('threshold', threshold)
}
export default plugin

declare module 'vue/types/vue' {
  interface Vue {
    $threshold: Threshold
  }
}
