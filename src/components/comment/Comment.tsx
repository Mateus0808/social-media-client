import { SlOptions } from 'react-icons/sl'
import { CommentProps } from '../../services/comment/type/comment.interface'
import { useState, useRef } from 'react'
import { deleteCommentService } from '../../services/comment/delete-comment.service'

interface IComment {
  data: CommentProps
  userName: string
  userIdAuthenticated: string | undefined
}

export const Comment = ({ data, userName, userIdAuthenticated }: IComment) => {
  const [options, setOptions] = useState(false)
  const [comment, setComment] = useState<null | CommentProps>(data)
  const catMenu = useRef<any>(null)

  const closeOpenMenus = (e: any) => {
    if (catMenu.current && options && !catMenu.current.contains(e.target)) {
      setOptions(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus)

  const deleteComment = async () => {
    const deletedComment = await deleteCommentService({
      commentId: data._id,
      userId: data.userId,
      postId: data.postId,
    })
    if (!deletedComment.error) {
      setComment(null)
    }
  }

  const editComment = () => {}
  console.log('comment?._id', comment, data)
  return (
    <>
      {comment && (
        <div
          className="flex gap-4 mt-2 items-start justify-start"
          ref={catMenu}
        >
          <img src="/profile.svg" alt="" className="h-8 w-8" />
          <div className="flex flex-col justify-start bg-gray-200 p-2 rounded-2xl">
            <span className="font-bold">{userName}</span>
            <span>{comment?.comment}</span>
          </div>
          {data.userId === userIdAuthenticated && (
            <div className="relative flex items-center justify-center h-16">
              <button
                onClick={(e) => setOptions(!options)}
                className="rounded-full p-2 hover:bg-gray-200"
              >
                <SlOptions />
              </button>
              {options && (
                <ul
                  className="absolute min-w-[124px] -right-56 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabi-index="-1"
                >
                  <li
                    className="pt-2 mx-2 flex flex-col items-center"
                    role="none"
                    key={`${comment?._id}_edit`}
                  >
                    <button className="p-2 w-full rounded-md hover:bg-gray-100">
                      Editar
                    </button>
                  </li>
                  <li
                    className="pb-2 mx-2 flex flex-col items-center"
                    role="none"
                    key={`${comment?._id}_delete`}
                  >
                    <button
                      onClick={() => deleteComment()}
                      className="p-2 w-full rounded-md hover:bg-gray-100"
                    >
                      Excluir
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
