import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'modules/utils',
  stateFactory: true,
  namespaced: true,
})
class UtilsModule extends VuexModule {
  private sortItem: string = 'policy_accepted-desc'

  public get getSortItem(): string {
    return this.sortItem
  }

  @Mutation
  public setSort(item: string): void {
    this.sortItem = item
  }

  @Action
  setSortItem(item: string): void {
    this.context.commit('setSort', item)
  }
}

export default UtilsModule
