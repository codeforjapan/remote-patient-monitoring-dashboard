export interface Center {
  centerId: string
  centerName: string
}

export interface Nurse {
  nurseId: string
  manageCenters: Center[]
}
