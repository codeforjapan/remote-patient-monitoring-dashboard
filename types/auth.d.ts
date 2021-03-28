export interface AuthUser {
  username: string
  idToken: string
  refreshToken: string
  isExpired: boolean
}
