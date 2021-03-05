/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '~/store/modules/auth'
import StatusesModule from '~/store/modules/statuses'
import PatientsModule from '~/store/modules/patients'
import NursesModule from '~/store/modules/nurses'

let authStore: AuthModule
let statusesStore: StatusesModule
let patientsStore: PatientsModule
let nursesStore: NursesModule

function initialiseStores(store: Store<any>): void {
  authStore = getModule(AuthModule, store)
  statusesStore = getModule(StatusesModule, store)
  patientsStore = getModule(PatientsModule, store)
  nursesStore = getModule(NursesModule, store)
}

export {
  initialiseStores,
  authStore,
  statusesStore,
  patientsStore,
  nursesStore,
}
