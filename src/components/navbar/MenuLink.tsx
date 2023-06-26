import { IconContext } from 'react-icons'

interface MenuLinkProps {
  href: string
  title: string
  iconComponent: any
}

export const MenuLink = ({ href, title, iconComponent }: MenuLinkProps) => {
  return (
    <a
      href={href}
      className="flex rounded-md gap-4 items-center font-semibold text-base text-gray-700 w-full text-left min-h-[48px] px-4 py-1 hover:bg-gray-100"
      role="menuitem"
      tab-index="-1"
      id="menu-item-6"
    >
      <div className='flex justify-center items-center h-12 w-12 rounded-full bg-gray-200'>
        <IconContext.Provider value={{ className: 'w-7 h-7 flex items-center justify-center' }}>
          {iconComponent}
        </IconContext.Provider>
      </div>
      {title}
    </a>
  )
}
