import { AxiosError } from "axios"
import apiClient from "../api-client.service"

interface ErrorResponse {
  message: string
}

export const userTimelineService = async (userId: string) => {
  try {
    const userTimeline = await apiClient.get(`/users/timeline/${userId}`)

    return {
      data: userTimeline.data,
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
      data: errorMessage,
      error: true,
    }
  }

}