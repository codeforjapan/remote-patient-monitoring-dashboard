import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import AuthService from '@/services/AuthService'
import { AuthUser } from '@/types/auth'

const storedUser = localStorage.getItem('user')

@Module({
  name: 'modules/auth',
  stateFactory: true,
  namespaced: true,
})
export default class AuthModule extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false }
  private userprop: AuthUser | null = storedUser ? JSON.parse(storedUser) : null

  get user(): AuthUser | null {
    return this.userprop
  }

  get isExpired(): boolean {
    if (!this.userprop) return false
    return this.userprop.isExpired
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn
  }

  @Mutation
  public loginSuccess(user: AuthUser): void {
    this.userprop = user
    this.status.loggedIn = true
    if (user.idToken) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  @Mutation
  public updateIdToken(idToken: string): void {
    this.userprop!.idToken = idToken
    this.userprop!.isExpired = false
    localStorage.setItem('user', JSON.stringify(this.userprop))
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false
    this.userprop = null
    localStorage.removeItem('user')
  }

  @Mutation
  public setExpired(isExpired: boolean): void {
    this.userprop!.isExpired = isExpired
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false
    this.userprop = null
    localStorage.removeItem('user')
  }

  @Action
  public checkIsExpired(): Promise<boolean> {
    if (!this.userprop) return Promise.resolve(false)
    if (this.userprop.isExpired) return Promise.resolve(true)
    const payload: any = JSON.parse(atob(this.userprop!.idToken.split('.')[1]!))
    const isExpird = new Date().getTime() > payload.exp * 1000
    this.context.commit('setExpired', isExpird)
    return Promise.resolve(isExpird)
  }

  @Action({ rawError: true })
  public login(data: {
    username: string
    password: string
  }): Promise<AuthUser> {
    return AuthService.login(data.username, data.password).then(
      (user) => {
        this.context.commit('loginSuccess', user)
        return Promise.resolve(user)
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
  refreshToken(): Promise<AuthUser> {
    return AuthService.refreshToken(this.user!.refreshToken).then(
      (userdata) => {
        if (this.user) {
          this.context.commit('updateIdToken', userdata.idToken)
          return Promise.resolve(this.user)
        } else {
          this.context.commit('loginSuccess', userdata)
          return userdata
        }
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

  @Action
  signOut(): void {
    AuthService.logout()
    this.context.commit('logout')
  }
}
