import authHeader from './auth-header'
import { $axios } from '@/utils/api-accessor'
import { Status, ConsumeStatus } from '~/types/component-interfaces/status'
import { AuthUser } from '~/types/auth'

class UserService {
  async getUserInfo() {
    const response = await $axios.get(`patients/${this.getUserId()}`, {
      headers: authHeader(),
    })
    return response.data
  }

  async getStatuses(): Promise<Status[]> {
    const response = await $axios.get(`patients/${this.getUserId()}/statuses`, {
      headers: authHeader(),
    })
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

  async postStatus(patientId: string, status: ConsumeStatus) {
    const response = await $axios.post(
      `patients/${patientId}/statuses`,
      status,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }

  async deleteStatus(patientId: string, statusId: string) {
    const response = await $axios.delete(
      `patients/${patientId}/statuses/${statusId}`,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }
}

export default new UserService()
