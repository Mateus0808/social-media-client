export interface UserResponse {
  username: string
  name: string
  lastName: string
  email: string
  password: string
  birthDate: Date
  maritalStatus: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  phone: string
  isPrivate: boolean
  status: 'ACTIVE' | 'CLOSED' | 'CANCELED' | 'DISABLED'
  id: string
  followers: Array<string>
  followings: Array<string>
  profilePhoto: any
  coverPhoto: any
  createdAt: Date
}