import { CommentProps } from "../../comment/type/comment.interface"

export interface ImageEntity {
  key: string
  filename: string
  size: number
  url: string
}

export interface UserEntity {
  name: string
  lastName: string
  username: string
  email: string
  birthDate: Date
  maritalStatus: string
  phone: string
  gender: 'MALE' | 'FEMALE'
  followers: Array<string>
  followings: Array<string>
  password: string
  profilePhoto: ImageEntity
  coverPhoto: ImageEntity
  status: 'ACTIVE' | 'CLOSED' | 'CANCELED' | 'DISABLED'
  isPrivate: boolean
}

export interface UserDbModel extends UserEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}


export interface PostEntity {
  user: UserDbModel
  image: string
  caption: string
  likes: Array<string>
  comments: Array<CommentProps>
  shareCount: number
  shareUrl: string
  shareTitle: string
  shareDescription: string
  shareImage: string
}

export interface PostDbModel extends PostEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface ListPostsServiceResponse {
  posts: PostDbModel[]
  pagination: any
}