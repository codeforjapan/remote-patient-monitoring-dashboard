/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '~/store/modules/auth'
import StatusesModule from '~/store/modules/statuses'
import PatientsModule from '~/store/modules/patients'

let authStore: AuthModule
let statusesStore: StatusesModule
let patientsStore: PatientsModule

function initialiseStores(store: Store<any>): void {
  authStore = getModule(AuthModule, store)
  statusesStore = getModule(StatusesModule, store)
  patientsStore = getModule(PatientsModule, store)
}

export { initialiseStores, authStore, statusesStore, patientsStore }
