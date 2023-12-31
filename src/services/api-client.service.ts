import cookie from 'cookie'
import { apiSetup } from './api-setup.service'

const apiClient = () => {
  const cookies = document.cookie

  const token = localStorage.getItem('access_token')
  // const parsedCookies = cookie.parse(cookies)
  console.log('token 2', token)

  const api = apiSetup
  console.log('token api deefaults', api.defaults)
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
  }

  api.interceptors.request.use((config) => {
    console.log('config', config)
    return config
  })

  return api
}

export default apiClient()
