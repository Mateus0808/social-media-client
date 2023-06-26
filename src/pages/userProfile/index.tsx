import { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Profile } from '../../components/profile'
import { userTimelineService } from '../../services/user/timeline.service'
import { ListPostsServiceResponse } from '../../services/post/type/post-response.interfacec'
import { Post } from '../../components/post/Post'
import { useAuthenticated } from '../../contexts/AuthContext'
import { getUserByIdPosts } from '../../services/post/get-user-by-id-posts.service'
import { CreatePostModal } from '../../components/post/CreatePostModal'
import { NavBar } from '../../components/navbar'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../services/user/get-user-by-id.service'
import { searchUserByUsername } from '../../services/user/search-user-by-username.service'
import { UserResponse } from '../../services/user/type/user-response.interface'

export const UserProfile = () => {
  const { user } = useAuthenticated()
  const [userPosts, setUserPosts] = useState<ListPostsServiceResponse>()
  const [error, setError] = useState<string | undefined>()
  const [errorTimeline, setErrorTimeline] = useState('')
  const { username } = useParams()
  const [userByUsername, setUserByUsername] = useState<
    UserResponse | undefined
  >()

  useEffect(() => {
    async function fetchData() {
      let timeline
      if (user?.id && username) {
        const newUser = await searchUserByUsername({
          username,
          userId: user.id,
        })

        if (newUser.data) {
          setUserByUsername(newUser.data)
          if (newUser.data?.id === user?.id) {
            timeline = await getUserByIdPosts(user?.id)
          } else {
            timeline = await getUserByIdPosts(newUser.data.id)
          }
          setUserPosts(timeline.data)
        }
        if (newUser.error) {
          setError(newUser.errorMessage)
          return
        }
        if (timeline?.error) {
          setErrorTimeline(timeline.data)
          return
        }
      }
    }
    fetchData()
  }, [user])

  console.log('userByUsername', username, userByUsername)
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center pb-8">
        <div className="flex ">
          <div className="sticky w-min xl:w-1/4 bg-white h-full">
            <Sidebar
              userName={user?.name + ' ' + user?.lastName}
              linkUsername={user?.username || ''}
            />
          </div>
          {username === user?.username ? (
            <div className="w-full h-full flex flex-col justify-center gap-8">
              <Profile user={user} />

              <div className="grid grid-cols-1 grid-flow-row px-8 gap-8 xl:grid-cols-2">
                {userPosts &&
                  userPosts.posts.map((post) => <Post post={post} />)}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center gap-8">
              <Profile user={userByUsername} />

              <div className="grid grid-cols-1 grid-flow-row px-8 gap-8 xl:grid-cols-2">
                {userPosts &&
                  userPosts.posts.map((post) => <Post post={post} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
