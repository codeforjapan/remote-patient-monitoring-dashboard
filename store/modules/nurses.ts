import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import NurseService from '@/services/NurseService'
import { Nurse } from '@/types/component-interfaces/nurse'

@Module({
  name: 'modules/nurses',
  stateFactory: true,
  namespaced: true,
})
class NursesModule extends VuexModule {
  private centerId = ''

  public get getCenterId(): string {
    return this.centerId
  }

  @Mutation
  public setCenterId(centerId: string): void {
    this.centerId = centerId
  }

  @Action({ rawError: true })
  load(nurseId: string): Promise<Nurse> {
    return NurseService.getNurseInfo(nurseId).then(
      (nurse) => {
        return Promise.resolve(nurse)
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
  setCenter(centerId: string): void {
    this.context.commit('setCenterId', centerId)
  }
}

export default NursesModule
