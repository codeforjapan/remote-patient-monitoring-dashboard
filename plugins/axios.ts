import { Plugin } from '@nuxt/types'
import { initializeAxios } from '@/utils/api-accessor'

export const accessor: Plugin = ({ $axios }): void => {
  initializeAxios($axios)
}

export default accessor
