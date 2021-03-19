/* eslint-disable camelcase */
import { Status } from './status'

export interface Patient {
  patientId: string
  centerId: string
  policy_accepted: string
  phone: string
  memo?: string | undefined
  display: boolean
  statuses: Status[]
}
export interface ConsumePatient {
  centerId: string
  phone: string
  memo?: string | undefined
  display: boolean
  sendSMS: boolean
}
export interface RegisteredPatient {
  phone: string
  memo?: string | undefined
  loginKey: string
}
export interface UpdatePatient {
  patientId: string
  phone: string
  memo?: string | undefined
  display: boolean
}
