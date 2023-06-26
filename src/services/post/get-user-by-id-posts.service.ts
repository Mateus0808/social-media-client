import { AxiosError } from "axios";
import apiClient from "../api-client.service";

interface ErrorResponse {
  message: string
}

export const getUserByIdPosts = async (userId: string) => {
  try {
    const post = await apiClient.get(`/posts/${userId}`)

    return {
      data: post.data,
      error: false,
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<ErrorResponse>
    let errorMessage: string;

    if (axiosError.response) {
      errorMessage = axiosError.response.data.message;
    } else if (axiosError.request) {
      errorMessage = 'Erro de conexão';
    } else {
      errorMessage = axiosError.message;
    }

    return {
      data: errorMessage,
      error: true,
    }
  }
}