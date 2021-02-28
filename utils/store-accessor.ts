/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '~/store/modules/auth'

let authStore: AuthModule

function initialiseStores(store: Store<any>): void {
  authStore = getModule(AuthModule, store)
}

export { initialiseStores, authStore }
