import { NavLink, Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export const App = () => {
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      <nav className="p-2 border-b-gray-600 bg-gray-600 text-white">
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
          <NavLink
            to="katapayadi-decoder"
            className={({ isActive }) =>
              twMerge('text-2xl', isActive && 'font-bold')
            }
          >
            Katapayadi decoder
          </NavLink>
          <NavLink
            to="transliterate"
            className={({ isActive }) =>
              twMerge('text-2xl', isActive && 'font-bold')
            }
          >
            Transliterate
          </NavLink>
        </ul>
      </nav>
      <main className="p-2">
        <Outlet />
      </main>
    </div>
  )
}
