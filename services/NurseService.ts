import { $axios } from '@/utils/api-accessor'
import { Nurse } from '@/types/component-interfaces/nurse'
import authHeader from './auth-header'

class NurseService {
  async getNurseInfo(nurseId: string): Promise<Nurse> {
    const response = await $axios.get(`nurses/${nurseId}`, {
      headers: authHeader(),
    })
    return response.data
  }
}

export default new NurseService()
