import { Sidebar } from '../../components/Sidebar'
import { NavBar } from '../../components/navbar'
import { useAuthenticated } from '../../contexts/AuthContext'

export const FriendsPage = () => {
  const { user } = useAuthenticated()

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center sm:flex-row">
        <div className="w-1/4">
          <Sidebar
            userName={user?.name + ' ' + user?.lastName}
            linkUsername={user?.username || ''}
          />
        </div>
        <div className="w-3/4 bg-white rounded-md">
          <div className="grid grid-cols-2 p-4 gap-4">
            <div className="bg-white h-24 p-2 flex gap-4 items-center rounded-lg shadow-md">
              <img
                src="/profile.svg"
                alt=""
                className="h-full w-18 rounded-md"
              />
              <span>Mateus Santos</span>
            </div>
            <div className="bg-white h-24 p-2 flex gap-4 items-center rounded-lg shadow-md">
              <img
                src="/profile.svg"
                alt=""
                className="h-full w-18 rounded-md"
              />
              <span>Mateus Santos</span>
            </div>
            <div className="bg-white h-24 p-2 flex gap-4 items-center rounded-lg shadow-md">
              <img
                src="/profile.svg"
                alt=""
                className="h-full w-18 rounded-md"
              />
              <span>Mateus Santos</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
