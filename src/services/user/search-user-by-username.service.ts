import { AxiosError } from 'axios'
import { apiSetup } from '../api-setup.service'
import { UserResponse } from './type/user-response.interface'
import apiClient from '../api-client.service'

interface ErrorResponse {
  message: string
}

interface SearchUserByUsernameProps {
  username: string
  userId: string
}

interface SearchUserResponseProps {
  data?: UserResponse
  error: boolean
  errorMessage?: string
}

export const searchUserByUsername = async ({
  username,
  userId,
}: SearchUserByUsernameProps): Promise<SearchUserResponseProps> => {
  try {
    const user = await apiClient.get(
      `/user/search-by-username/${userId}?username=${username}`
    )

    return {
      data: user.data,
      error: false,
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<ErrorResponse>
    let errorMessage: string

    if (axiosError.response) {
      errorMessage = axiosError.response.data.message
    } else if (axiosError.request) {
      errorMessage = 'Erro de conexão'
    } else {
      errorMessage = axiosError.message
    }

    return {
      errorMessage,
      error: true,
    }
  }
}
