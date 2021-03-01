import axios from 'axios'
import authHeader from './auth-header'
import { ConsumePatient, Patient } from '~/types/component-interfaces/patient'

const API_URL = 'https://monitoring.stopcovid19.jp/stg/api/nurse/'

class PatientService {
  async getPatients(): Promise<Patient[]> {
    const response = await axios.get(API_URL + 'patients/', {
      headers: authHeader(),
    })
    return response.data
  }

  async postPatient(patient: ConsumePatient): Promise<Patient> {
    const response = await axios.post(API_URL + 'patients/', patient, {
      headers: authHeader(),
    })
    return response.data
  }
}

export default new PatientService()
