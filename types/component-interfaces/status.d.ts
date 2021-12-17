/* eslint-disable camelcase */
export interface Status {
  statusId: string
  patientId: string
  centerId: string
  created: string
  SpO2: number
  body_temperature: number
  pulse: number
  symptom?: {
    symptomId: string
    cough: boolean
    phlegm: boolean
    suffocation: boolean
    headache: boolean
    sore_throat: boolean
    malaise: boolean
    nausea: boolean
    diarrhea: boolean
    difficulty_eating: boolean
    no_urination: boolean
    remarks?: string
  }
}
export interface ConsumeStatus {
  created: string
  SpO2: number
  body_temperature: number
  pulse: number
  symptom: {
    cough: boolean
    phlegm: boolean
    suffocation: boolean
    headache: boolean
    sore_throat: boolean
    malaise: boolean
    nausea: boolean
    diarrhea: boolean
    difficulty_eating: boolean
    no_urination: boolean
    remarks: string
  }
}
