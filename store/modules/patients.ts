import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import PatientService from '@/services/PatientService'
import {
  Patient,
  ConsumePatient,
  RegisteredPatient,
} from '@/types/component-interfaces/patient'

@Module({
  name: 'modules/patients',
  stateFactory: true,
  namespaced: true,
})
class PatientsModule extends VuexModule {
  private patients: Patient[] = []
  private patient: Patient = {
    centerId: '',
    display: true,
    patientId: '',
    phone: '',
    policy_accepted: '',
    statuses: [],
  }

  public get getPatients(): Patient[] {
    return this.patients
  }

  @Mutation
  public loadSuccess(patients: Patient[]): void {
    this.patients = patients
  }

  @Mutation
  public loadPatientSuccess(patient: Patient): void {
    this.patient = patient
  }

  @Mutation
  public pushPatient(patient: Patient): void {
    this.patients.push(patient)
  }

  @Mutation
  public removePatient(patientId: string): void {
    this.patients.splice(
      this.patients.findIndex((item) => item.patientId === patientId),
      1,
    )
  }

  @Mutation
  public loadFailure(): void {
    this.patients = []
  }

  @Action({ rawError: true })
  load(): Promise<Patient[]> {
    return PatientService.getPatients().then(
      (patients) => {
        this.context.commit('loadSuccess', patients)
        return Promise.resolve(patients)
      },
      (error) => {
        this.context.commit('loginFailure')
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.errorMessage) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }

  @Action({ rawError: true })
  create(patient: ConsumePatient): Promise<RegisteredPatient> {
    return PatientService.postPatient(patient).then(
      (patient) => {
        this.context.commit('pushPatient', patient)
        return Promise.resolve(patient)
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.errorMessage) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }

  @Action({ rawError: true })
  loadPatient(patientId: string): Promise<Patient> {
    return PatientService.getPatient(patientId).then(
      (patient) => {
        this.context.commit('loadPatientSuccess', patient)
        return Promise.resolve(patient)
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.errorMessage) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }

  @Action({ rawError: true })
  update(patient: ConsumePatient): Promise<Patient> {
    return PatientService.putPatient(patient.patientId, patient).then(
      (patient) => {
        return Promise.resolve(patient)
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.errorMessage) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }
}

export default PatientsModule
