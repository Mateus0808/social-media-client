export interface CommentProps {
  _id: string
  userId: string
  postId: string
  comment: string
  likes: Array<string>
}