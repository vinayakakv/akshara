import { NavLink, Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export const App = () => {
  return (
    <main className="h-full p-2 flex flex-col gap-4 overflow-hidden">
      <nav className="border-b-gray-600">
        <ul className="flex flex-row gap-4">
          <NavLink
            to="tokenizer"
            className={({ isActive }) =>
              twMerge('text-2xl', isActive && 'font-bold')
            }
          >
            Tokenizer
          </NavLink>
          <NavLink
            to="prastara"
            className={({ isActive }) =>
              twMerge('text-2xl', isActive && 'font-bold')
            }
          >
            Prastara
          </NavLink>
        </ul>
      </nav>
      <Outlet />
    </main>
  )
}
