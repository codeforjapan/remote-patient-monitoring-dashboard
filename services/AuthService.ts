import { $axios } from '@/utils/api-accessor'
import { AuthUser } from '@/types/auth'

class AuthService {
  login(username: string, password: string): Promise<AuthUser> {
    return $axios
      .post('login', {
        username,
        password,
      })
      .then((response) => {
        return { ...response.data, isExpired: false }
      })
  }

  refreshToken(refreshToken: string): Promise<AuthUser> {
    return $axios
      .post('login', {
        refreshToken,
      })
      .then((response) => {
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
