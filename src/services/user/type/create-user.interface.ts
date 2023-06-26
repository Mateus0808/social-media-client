export interface CreateUserParams {
  username: string
  name: string
  lastName: string
  email: string
  birthDate: string
  maritalStatus: string
  password: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  phone: string
}