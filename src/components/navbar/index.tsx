import { useState, useEffect } from 'react'
import { MenuLink } from './MenuLink'
import { BsFillGearFill } from 'react-icons/bs'
import { ImExit } from 'react-icons/im'
import { IoMdSearch } from 'react-icons/io'
import { IconContext } from 'react-icons'
import { useAuthenticated } from '../../contexts/AuthContext'
import { SendIcon } from '../icons/SendIcon'
import { searchUserByUsername } from '../../services/user/search-user-by-username.service'
import { UserResponse } from '../../services/user/type/user-response.interface'

export const NavBar = () => {
  const { signOut, user } = useAuthenticated()
  const [search, setSearch] = useState('')
  const [searchedUser, setSearchedUser] = useState<UserResponse | null>()
  const [menu, setMenu] = useState(false)

  const searchUser = async () => {
    if (user?.id) {
      const myUser = await searchUserByUsername({
        username: search,
        userId: user?.id,
      })
      if (myUser.error) {
        return
      }
      setSearchedUser(myUser.data)
    }
  }

  useEffect(() => {
    if (search.length <= 0) {
      setSearchedUser(null)
    }
  }, [search])

  return (
    <nav className="flex px-4 h-16 items-center justify-between bg-white border-b-2">
      <div className="w-1/4">
        <span className="p-2 font-bold text-xl">Logo</span>
      </div>
      <div className="w-1/2 flex justify-center">
        <div className="relative w-full items-center">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <IconContext.Provider
              value={{ color: 'gray', className: 'h-6 w-6' }}
            >
              <IoMdSearch />
            </IconContext.Provider>
          </span>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            id="search"
            placeholder="Faça uma pesquisa..."
            className="w-full outline-none h-12 px-10 py-1 rounded-2xl bg-gray-200"
          />
          <button
            type="button"
            onClick={() => searchUser()}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full ${
              search.length <= 0 ? 'cursor-not-allowed' : 'hover:bg-gray-200'
            }`}
            disabled={search.length <= 0}
          >
            <SendIcon color="#385898" />
          </button>
          {searchedUser && search.length > 0 && (
            <div className="w-full z-50 absolute -bottom-16">
              <a
                href={`/${searchedUser.username}`}
                className="bg-white px-4 items-center flex gap-4 rounded-md h-14 hover:bg-gray-100 cursor-pointer"
              >
                <img src="/profile.svg" alt="" className="h-10 w-10" />
                <span className="font-semibold">
                  {searchedUser?.name + ' ' + searchedUser?.lastName}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="relative inline-block text-right w-1/4">
        <div>
          <button
            type="button"
            className="relative inline-flex w-auto justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setMenu(!menu)}
          >
            <img src="/profile.svg" alt="" className="" />
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {menu && (
          <div
            className="min-w-[344px] absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabi-index="-1"
          >
            <div className="py-2 mx-2" role="none">
              <a
                href={`/${user?.username}`}
                className="flex gap-4 h-15 items-center px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <img src="/profile.svg" alt="Profile" className="h-12 w-12" />{' '}
                <span className="font-medium whitespace-nowrap">
                  {user?.name + ' ' + user?.lastName}
                </span>
              </a>
              <div className="flex flex-col py-2 items-center" role="none">
                <MenuLink
                  title="Configurações"
                  href=""
                  iconComponent={<BsFillGearFill />}
                />
              </div>
              <div
                onClick={() => signOut()}
                className="flex flex-col py-2 items-center"
                role="none"
              >
                <MenuLink title="Sair" href="" iconComponent={<ImExit />} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
