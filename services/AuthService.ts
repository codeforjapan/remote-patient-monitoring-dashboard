import axios from 'axios'
import { AuthUser } from '~/types/auth'

const API_URL = process.env.apiUrl

class AuthService {
  login(username: string, password: string): Promise<AuthUser> {
    return axios
      .post(API_URL + 'login', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.idToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
