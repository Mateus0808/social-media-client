import { AxiosError } from 'axios'
import apiClient from '../api-client.service'

interface ErrorResponse {
  message: string
}

interface CreateCommentProps {
  userId: string
  postId: string
  comment: string
}

export const createCommentService = async ({
  userId,
  postId,
  comment,
}: CreateCommentProps) => {
  try {
    const createdComment = await apiClient.post(
      `/comment/register/${userId}/${postId}`,
      { comment }
    )
    console.log('createdComment', createdComment)
    return {
      data: createdComment.data,
      error: false,
    }
  } catch (error: any) {
    console.log('createdCommentError', error)
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
