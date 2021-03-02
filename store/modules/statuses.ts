import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import UserService from '@/services/UserService'
import { ConsumeStatus, Status } from '~/types/component-interfaces/status'

@Module({
  name: 'modules/statuses',
  stateFactory: true,
  namespaced: true,
})
class StatusesModule extends VuexModule {
  private statuses: Status[] = []

  public get getStatuses(): Status[] | undefined {
    return this.statuses
  }

  @Mutation
  public loadSuccess(statuses: Status[]): void {
    this.statuses = statuses
  }

  @Mutation
  public pushStatus(status: Status): void {
    this.statuses.push(status)
  }

  @Mutation
  public removeStatus(statusId: string): void {
    this.statuses.splice(
      this.statuses.findIndex((item) => item.statusId === statusId),
      1,
    )
  }

  @Mutation
  public loadFailure(): void {
    this.statuses = []
  }

  @Action({ rawError: true })
  load(): Promise<Status[]> {
    return UserService.getStatuses().then(
      (statuses) => {
        this.context.commit('loadSuccess', statuses)
        return Promise.resolve(statuses)
      },
      (error) => {
        this.context.commit('loginFailure')
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }

  @Action({ rawError: true })
  create(status: ConsumeStatus): Promise<Status> {
    return UserService.postStatus(status).then(
      (status) => {
        this.context.commit('pushStatus', status)
        return Promise.resolve(status)
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }

  @Action({ rawError: true })
  delete(item: {
    patientId: string
    statusId: string
  }): Promise<boolean | string> {
    return UserService.deleteStatus(item.patientId, item.statusId).then(
      () => {
        this.context.commit('removeStatus', item.statusId)
        return Promise.resolve(true)
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }
}

export default StatusesModule
