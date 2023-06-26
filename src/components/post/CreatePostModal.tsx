import { useRef, useState } from 'react'
import { Form } from '@unform/web'
import { TextArea } from '../TextArea'
import { IoMdClose } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { useAuthenticated } from '../../contexts/AuthContext'
import { createPostService } from '../../services/post/create-post.service'

interface PostModalProps {
  setPostModal: (arg: boolean) => void
}

export const CreatePostModal = ({ setPostModal }: PostModalProps) => {
  const [description, setDescription] = useState('')
  const formRef = useRef(null)
  const { user } = useAuthenticated()

  const handleSubmit = async (e: any) => {
    if (user?.id) {
      const post = await createPostService(e, user.id)
      if (!post.error) {
        setPostModal(false)
      }
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-2/5 p-4 rounded-lg shadow-lg overflow-y-auto">
        <div className="flex relative items-center justify-center mb-4">
          <h2 className="text-lg font-bold text-center">Criar Publicação</h2>
          <div
            onClick={() => setPostModal(false)}
            className="flex absolute right-0"
          >
            <IconContext.Provider
              value={{
                className:
                  'h-10 w-10 p-1 bg-gray-200 rounded-3xl cursor-pointer hover:bg-gray-300',
              }}
            >
              <IoMdClose />
            </IconContext.Provider>
          </div>
        </div>
        <div className="border-b border-gray-300 mt-2 mb-2"></div>
        <div>
          <div className="flex gap-4 items-center">
            <img src="/profile.svg" alt="" />
            <div>
              <span className="font-semibold">
                {user?.name + ' ' + user?.lastName}
              </span>
            </div>
          </div>

          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className="mb-4">
              <TextArea
                name="caption"
                placeholder={`No que você está pensando, ${user?.name}?`}
                rows={4}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Publicar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
