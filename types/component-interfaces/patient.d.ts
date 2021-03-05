/* eslint-disable camelcase */
import { Status } from './status'

export interface Patient {
  patientId: string
  centerId: string
  policy_accepted: string
  phone: string
  display: boolean
  statuses: Status[]
}
export interface ConsumePatient {
  patientId: string
  phone: string
  display: boolean
}
export interface RegisteredPatient extends Patient {
  loginKey: string
}
