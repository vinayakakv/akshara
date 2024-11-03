import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { TransliterationContext, useTransliterate } from './lib/aksharamukha.ts'
import { useEffect, useState } from 'react'

export const App = () => {
  const [language, setLanguage] = useState('')
  const { transliterateApi } = useTransliterate()
  const { pathname } = useLocation()
  useEffect(() => {
    console.log(pathname)
    setLanguage('')
  }, [pathname])
  return !transliterateApi ? (
    <p>Loading...</p>
  ) : (
    <TransliterationContext.Provider
      value={{
        language,
        setLanguage,
        toKannada: (input) =>
          transliterateApi.process({ from: language, to: 'Kannada', input }),
        t: (input) =>
          transliterateApi.process({ from: 'Kannada', to: language, input }),
        transliterateApi,
      }}
    >
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
          <p>Language: {language}</p>
        </nav>
        <main className="p-2 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </TransliterationContext.Provider>
  )
}
