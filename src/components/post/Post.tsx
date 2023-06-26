import { useState } from 'react'
import { IconContext } from 'react-icons'
import { BiLike } from 'react-icons/bi'
import { GoComment } from 'react-icons/go'
import { PostDbModel } from '../../services/post/type/post-response.interfacec'
import { Comment } from '../comment/Comment'
import { useAuthenticated } from '../../contexts/AuthContext'
import { toggleLikePost } from '../../services/post/toggle-like-post.service'
import { SendIcon } from '../icons/SendIcon'
import { createCommentService } from '../../services/comment/create-comment.service'
import { dateFormat } from '../../utils/dateFormat'

interface PostProps {
  post: PostDbModel
}

export const Post = ({ post }: PostProps) => {
  const { user } = useAuthenticated()
  const [myPost, setMyPost] = useState(post)
  const [fieldComment, setFieldComment] = useState(false)
  const [comment, setComment] = useState('')

  const toggleLikeOnPost = async () => {
    if (user?.id) {
      const post = await toggleLikePost({ postId: myPost.id, userId: user.id })
      if (!post.error) {
        setMyPost(post.data)
      }
    }
  }

  const createUserComment = async () => {
    if (user?.id) {
      const createdComment = await createCommentService({
        comment,
        postId: myPost.id,
        userId: user.id,
      })
      if (!createdComment.error) {
        setMyPost(createdComment.data)
        setComment('')
      }
    }
  }

  const includeLikeUserId = () => {
    if (user) {
      const userLike = myPost.likes.includes(user.id)
      return userLike
    }
    return false
  }

  return (
    <div className="bg-white p-4 border rounded-xl shadow-md">
      <div className="flex gap-4 items-center">
        <img src="/profile.svg" alt="" />
        <div className="flex flex-col gap-2">
          <span className="font-semibold">
            {myPost.user.name} {myPost.user.lastName}
          </span>
          <span className="text-xs text-gray-600 font-semibold">
            {dateFormat(myPost.createdAt)}
          </span>
        </div>
      </div>
      <div className="pt-4 text-justify">
        <span>{myPost.caption}</span>
        <div className="w-full py-2 flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <img
              src="/icon-like.svg"
              alt=""
              className="h-4 w-4 rounded-full bg-blue-700"
            />
            <span>{myPost.likes.length}</span>
          </div>
          <span className="text-gray-500 text-md">
            {myPost.comments.length === 1 &&
              `${myPost.comments.length} comentário`}
            {myPost.comments.length > 1 &&
              `${myPost.comments.length} comentários`}
          </span>
        </div>
      </div>
      <div className="flex w-full border-t-2">
        <button
          type="button"
          onClick={() => toggleLikeOnPost()}
          className="flex m-1 h-11 gap-4 w-1/2 items-center rounded-md justify-center hover:bg-gray-100"
        >
          <IconContext.Provider
            value={{
              color: `${includeLikeUserId() ? 'blue' : '#65676B'}`,
              className: 'h-6 w-6',
            }}
          >
            <BiLike />
          </IconContext.Provider>
          <span
            className={`font-semibold ${
              includeLikeUserId() ? 'text-blue-700' : 'text-[#65676B]'
            }`}
          >
            Curtir
          </span>
        </button>
        <button
          type="button"
          onClick={() => setFieldComment(!fieldComment)}
          className="flex m-1 h-11 gap-4 w-1/2 items-center rounded-md justify-center hover:bg-gray-100"
        >
          <IconContext.Provider
            value={{ color: '#65676B', className: 'h-6 w-6' }}
          >
            <GoComment />
            <span className="font-semibold text-[#65676B]">Comentar</span>
          </IconContext.Provider>
        </button>
      </div>
      {fieldComment && (
        <div className="border-t-2">
          <div className="relative py-2 flex gap-2 items-center">
            <img src="/profile.svg" alt="" className="h-8 w-8" />
            <input
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="outline-none py-3 px-4 bg-gray-100 rounded-xl w-full"
              type="text"
              placeholder="Faça um comentário..."
            />
            <button
              type="button"
              onClick={() => createUserComment()}
              className={`absolute right-2 rounded-full p-2 ${
                comment.length <= 0 ? 'cursor-not-allowed' : 'hover:bg-gray-200'
              }`}
              disabled={comment.length <= 0}
            >
              <SendIcon color={`${comment ? '#385898' : '#c4c4c4'}`} />
            </button>
          </div>
        </div>
      )}
      {myPost.comments.length > 0 && (
        <div className="border-t-2">
          {myPost.comments.map((comment) => (
            <Comment
              key={comment._id}
              data={comment}
              userName="Mateus Santos"
              userIdAuthenticated={user?.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
