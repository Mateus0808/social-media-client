import { AxiosError } from 'axios'
import apiClient from '../api-client.service'

interface ErrorResponse {
  message: string
}

interface EditCommentProps {
  commentId: string
  newComment: string
}

export const editCommentService = async ({
  commentId,
  newComment,
}: EditCommentProps) => {
  try {
    const editedComment = await apiClient.patch(
      `/comment/update/${commentId}`,
      { comment: newComment }
    )

    return {
      data: editedComment.data,
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
