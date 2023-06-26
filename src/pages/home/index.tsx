import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiFillHome } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { HiUserAdd } from 'react-icons/hi'
import { IoMdPhotos } from 'react-icons/io'
import { userTimelineService } from '../../services/user/timeline.service'
import { Form } from '@unform/web'
import { CreatePostModal } from '../../components/post/CreatePostModal'
import { BiLike } from 'react-icons/bi'
import { Post } from '../../components/post/Post'
import { ListPostsServiceResponse } from '../../services/post/type/post-response.interfacec'
import { Sidebar } from '../../components/Sidebar'
import { useAuthenticated } from '../../contexts/AuthContext'
import { NavBar } from '../../components/navbar'

export const HomePage = () => {
  const { user, loading } = useAuthenticated()
  const [userTimeline, setUserTimeline] = useState<ListPostsServiceResponse>()
  const [error, setError] = useState(null)
  const [postModal, setPostModal] = useState(false)

  useEffect(() => {
    ;(async function fetchData() {
      const timeline = await userTimelineService(user?.id!)
      if (timeline.error) {
        setError(timeline.data)
        return
      }
      setUserTimeline(timeline.data)
      return
    })()
  }, [user])

  return (
    <>
      <NavBar />
      <div className="flex justify-between">
        <div className="w-min xl:w-1/4">
          <Sidebar
            userName={user?.name + ' ' + user?.lastName}
            linkUsername={user?.username || ''}
          />
        </div>
        <div className="w-full mt-6 pb-8 px-4 xl:w-1/2">
          <div className='w-full'>
            <div className="mb-4 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md">
              {postModal && <CreatePostModal setPostModal={setPostModal} />}
              <div className="flex gap-4">
                <img src="/profile.svg" alt="" className="rounded h-11 w-11" />
                <button
                  onClick={() => setPostModal(!postModal)}
                  className="w-full text-left text-gray-400 px-4 py-2 border-none outline-none bg-gray-200 rounded-2xl"
                >
                  No que você está pensando, Gabriela?
                </button>
              </div>
              <div className="flex">
                <a
                  href=""
                  className="flex gap-2 p-2 rounded-xl hover:bg-gray-100"
                >
                  <img
                    src="/icon-photo.svg"
                    alt="Icon Photo"
                    className="w-6 h-6"
                  />
                  <span>Adicionar foto</span>
                </a>
              </div>
            </div>
            {loading ? (
              <div>Carregando...</div>
            ) : (
              <div>
                <div className="flex flex-col gap-4">
                  {userTimeline &&
                    userTimeline.posts.map((post) => (
                      <Post key={post.id} post={post} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hidden bg-gray-200 xl:block w-1/4">
          {/* Lado Direito */}
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Amigos e Solicitações</h2>
            {/* Seção de Amigos e Solicitações */}
            <div className="bg-white p-4 border border-gray-300 rounded">
              <p>Amigo 1</p>
              <p>Amigo 2</p>
              <p>Amigo 3</p>
              {/* ... */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
