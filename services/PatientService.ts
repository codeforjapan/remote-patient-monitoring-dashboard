import axios from 'axios'
import authHeader from './auth-header'
import { ConsumePatient, Patient } from '~/types/component-interfaces/patient'

const API_URL = 'https://monitoring.stopcovid19.jp/stg/api/nurse/'

class PatientService {
  async getPatients(): Promise<Patient[]> {
    const response = await axios.get(
      API_URL + 'centers/79167710-2761-4cf4-8888-241e9f0c36b8/patients/',
      {
        headers: authHeader(),
      },
    )
    return response.data.Items
  }

  async postPatient(patient: ConsumePatient): Promise<Patient> {
    const response = await axios.post(
      API_URL + 'centers/79167710-2761-4cf4-8888-241e9f0c36b8/patients/',
      patient,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }

  async getPatient(patientId: string): Promise<Patient> {
    const response = await axios.get(API_URL + `patients/${patientId}`, {
      headers: authHeader(),
    })
    return response.data
  }

  async putPatient(
    patientId: string,
    payload: ConsumePatient,
  ): Promise<Patient> {
    const response = await axios.put(
      API_URL + `patients/${patientId}`,
      payload,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }
}

export default new PatientService()
