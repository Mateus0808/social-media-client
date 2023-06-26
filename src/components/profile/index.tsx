import { AiFillCamera } from 'react-icons/ai'
import { useAuthenticated } from '../../contexts/AuthContext'
import { UserDbModel } from '../../services/post/type/post-response.interfacec'
import { UserResponse } from '../../services/user/type/user-response.interface'
import { BsPencilFill } from 'react-icons/bs'

interface ProfileProps {
  user: UserResponse | undefined
}

export const Profile = ({ user }: ProfileProps) => {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center bg-white">
      <div className="px-8 w-full">
        <div className="relative">
          <div className="relative">
            <img src="/bg-profile.jpg" alt="" className="w-full rounded-md" />
            <button className="font-semibold flex gap-3 items-center text-base px-3 py-3 bg-slate-100/40 rounded-md absolute right-4 bottom-4 text-white">
              <AiFillCamera className='h-8 w-8' />
              <span className='hidden xl:block'>Adicionar foto da capa</span>
            </button>
          </div>
          <div className="absolute top-24 flex flex-col items-center w-full md:top-[16rem] xl:top-[16rem] md:flex-row md:pl-8 md:-bottom-[15rem]">
            <div className="relative">
              <img
                src="/profile.svg"
                alt=""
                className="rounded-full min-h-[12rem] min-w-[12rem] border-4 border-white"
              />
              <div className="absolute right-2 bottom-2 flex items-center justify-center bg-gray-200 rounded-full h-10 w-10">
                <AiFillCamera className='h-8 w-8' />
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3 justify-end">
              <p className="text-4xl font-bold whitespace-nowrap">
                {user?.name + ' ' + user?.lastName}
              </p>
              <span className="font-bold text-gray-500">
                {user?.followings.length} Seguindo
              </span>
              <span className="font-bold text-gray-500">
                {user?.followers.length} Seguidores
              </span>
            </div>
            <div className="flex items-end justify-end w-full pr-4">
              <button className="flex items-center gap-4 bg-gray-200 rounded-md p-3 font-bold hover:bg-gray-300">
                <BsPencilFill />
                <span className=''>Editar perfil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
