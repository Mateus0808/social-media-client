import { AxiosError } from 'axios'
import apiClient from '../api-client.service'

interface ErrorResponse {
  message: string
}

interface DeleteCommentProps {
  commentId: string
  userId: string
  postId: string
}

export const deleteCommentService = async ({
  commentId,
  userId,
  postId
}: DeleteCommentProps) => {
  try {
    const deletedComment = await apiClient.delete(
      `/comments/${userId}/${postId}/${commentId}`
    )
    console.log('editedComment ', deletedComment)
    return {
      data: deletedComment.data,
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
