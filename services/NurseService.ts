import axios from 'axios'
import { Nurse } from '@/types/component-interfaces/nurse'
import authHeader from './auth-header'

const API_URL = 'https://monitoring.stopcovid19.jp/stg/api/nurse/'

class NurseService {
  async getNurseInfo(nurseId: string): Promise<Nurse> {
    const response = await axios.get(API_URL + `nurses/${nurseId}`, {
      headers: authHeader(),
    })
    return response.data
  }
}

export default new NurseService()
