import axios from 'axios'
import authHeader from './auth-header'
import { Status, ConsumeStatus } from '~/types/component-interfaces/status'
import { AuthUser } from '~/types/auth'

const API_URL = process.env.apiUrl

class UserService {
  async getUserInfo() {
    const response = await axios.get(API_URL + `patients/${this.getUserId()}`, {
      headers: authHeader(),
    })
    return response.data
  }

  async getStatuses(): Promise<Status[]> {
    const response = await axios.get(
      API_URL + `patients/${this.getUserId()}/statuses`,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }

  getUserId() {
    const user = localStorage.getItem('user')
    if (!user) {
      return null
    }
    const authHeader = (JSON.parse(user) as AuthUser).idToken
    const payload = atob(authHeader.split('.')[1])
    return JSON.parse(payload)['cognito:username']
  }

  async postStatus(status: ConsumeStatus) {
    const response = await axios.post(
      API_URL + `patients/${this.getUserId()}/statuses`,
      status,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }

  async deleteStatus(patientId: string, statusId: string) {
    const response = await axios.delete(
      API_URL + `patients/${patientId}/statuses/${statusId}`,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }
}

export default new UserService()
