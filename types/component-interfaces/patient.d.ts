import { Status } from './status'

export interface Patient {
  patientId: string
  centerId: string
  policy_accepted: string
  phone: string
  display: true
  statuses: Status[]
}
