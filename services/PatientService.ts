import { $axios } from '@/utils/api-accessor'
import authHeader from './auth-header'
import {
  ConsumePatient,
  Patient,
  RegisteredPatient,
  UpdatePatient,
} from '~/types/component-interfaces/patient'

class PatientService {
  async getPatients(centerId: string): Promise<Patient[]> {
    const response = await $axios.get(`centers/${centerId}/patients/`, {
      headers: authHeader(),
    })
    return response.data.Items
  }

  async postPatient(
    centerId: string,
    patient: ConsumePatient,
  ): Promise<RegisteredPatient> {
    const response = await $axios.post(
      `centers/${centerId}/patients/`,
      patient,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }

  async getPatient(patientId: string): Promise<Patient> {
    const response = await $axios.get(`patients/${patientId}`, {
      headers: authHeader(),
    })
    return response.data
  }

  async putPatient(
    patientId: string,
    payload: UpdatePatient,
  ): Promise<Patient> {
    const response = await $axios.put(`patients/${patientId}`, payload, {
      headers: authHeader(),
    })
    return response.data
  }
}

export default new PatientService()
