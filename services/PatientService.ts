import axios from 'axios'
import authHeader from './auth-header'
import {
  ConsumePatient,
  Patient,
  RegisteredPatient,
  UpdatePatient,
} from '~/types/component-interfaces/patient'

const API_URL = 'https://monitoring.stopcovid19.jp/stg/api/nurse/'

class PatientService {
  async getPatients(centerId: string): Promise<Patient[]> {
    const response = await axios.get(
      API_URL + `centers/${centerId}/patients/`,
      {
        headers: authHeader(),
      },
    )
    return response.data.Items
  }

  async postPatient(
    centerId: string,
    patient: ConsumePatient,
  ): Promise<RegisteredPatient> {
    const response = await axios.post(
      API_URL + `centers/${centerId}/patients/`,
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
    payload: UpdatePatient,
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
