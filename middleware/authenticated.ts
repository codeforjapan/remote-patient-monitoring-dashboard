import { Middleware } from '@nuxt/types'
import { authStore } from '@/utils/store-accessor'

const authenticated: Middleware = ({ redirect }) => {
  if (!authStore.status.loggedIn) {
    redirect('/login')
  }
}

export default authenticated
