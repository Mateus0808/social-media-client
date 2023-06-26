import { IconContext } from 'react-icons'
import { AiFillHome } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { HiUserAdd } from 'react-icons/hi'
import { IoMdPhotos } from 'react-icons/io'
import { useAuthenticated } from '../contexts/AuthContext'

interface SideBarProps {
  userName: string
  linkUsername: string
}

export const Sidebar = ({ userName, linkUsername }: SideBarProps) => {
  return (
    <div className="p-4 h-[calc(100vh-4rem)] w-min xl:w-full">
      <ul className='w-min xl:w-full'>
        <li className="p-2">
          <a href="/home" className="flex gap-4 items-center">
            <IconContext.Provider
              value={{ color: '#4364D8', className: 'h-6 w-6' }}
            >
              <AiFillHome />
              <span className="font-medium hidden xl:block">Página Inicial</span>
            </IconContext.Provider>
          </a>
        </li>
        <li className="p-2">
          <a href={`${linkUsername}`} className="flex gap-4 items-center">
            <img src="/profile.svg" alt="Profile" className="h-6 w-6" />{' '}
            <span className="font-medium hidden xl:block">{userName}</span>
          </a>
        </li>
      </ul>
      <div className="border-b border-gray-300 mt-2 mb-2"></div>{' '}
      <ul>
        <li className="p-2">
          <a href="/friends" className="flex gap-4 items-center">
            <IconContext.Provider
              value={{ color: '#4364D8', className: 'h-6 w-6' }}
            >
              <FaUserFriends />
              <span className="font-medium hidden xl:block">Amigos</span>
            </IconContext.Provider>
          </a>
        </li>
        <li className="p-2">
          <a href="" className="flex gap-4 items-center">
            <IconContext.Provider value={{ className: 'h-6 w-6' }}>
              <HiUserAdd />
              <span className="font-medium hidden xl:block">Solicitações</span>
            </IconContext.Provider>
          </a>
        </li>
      </ul>
    </div>
  )
}
