import { useEffect, Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  autoDetectedLanguageAtom,
  languageHelpersAtom,
} from '@/state/languageState.ts'
import { loadingAtom } from '@/state/appState.ts'
import { Settings } from '@/components/settings.tsx'
import { Help } from '@/components/help.tsx'
import { GlobalLoading } from '@/components/loading.tsx'

const tools = [
  {
    id: 'tokenizer',
    name: 'Tokenizer',
  },
  {
    id: 'prastara',
    name: 'Prastara',
  },
  {
    id: 'katapayadi-decoder',
    name: 'Katapayadi Decoder',
  },
  {
    id: 'transliterate',
    name: 'Transliterate',
  },
]

const StatusIndicator = () => {
  const loading = useAtomValue(loadingAtom)
  return (
    <div className="flex items-center text-sm p-2 gap-2">
      {loading ? (
        <>
          <span className="text-yellow-600">Processing</span>
          <span className="bg-yellow-500 h-3 w-3 rounded-full animate-pulse" />
        </>
      ) : (
        <span className="bg-green-500 h-3 w-3 rounded-full" />
      )}
    </div>
  )
}

const NavBar = () => {
  const { t } = useAtomValue(languageHelpersAtom)
  return (
    <nav className="px-1 flex flex-row gap-2 justify-between items-center">
      <h1 className="text-xl font-bold hidden sm:inline">{t('ಅಕ್ಷರ')} Tools</h1>
      <div className="flex flex-row gap-2">
        <StatusIndicator />
        <Help />
        <Settings />
      </div>
    </nav>
  )
}

export const App = () => {
  const setAutoDetectedLanguageAtom = useSetAtom(autoDetectedLanguageAtom)
  const { pathname } = useLocation()

  useEffect(() => {
    setAutoDetectedLanguageAtom('')
  }, [pathname])

  return (
    <div className="h-full flex flex-col p-4 gap-2 overflow-hidden">
      {/*TODO: Add  error overlay*/}
      <Suspense fallback={<GlobalLoading />}>
        <NavBar />
        <Tabs value={pathname}>
          <TabsList className="w-full justify-start overflow-auto gap-4">
            {tools.map((tool) => (
              <TabsTrigger
                asChild
                key={tool.id}
                value={`/${tool.id}`}
                className="flex-1 max-w-[200px] data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-50 dark:data-[state=active]:bg-neutral-50 dark:data-[state=active]:text-neutral-900"
              >
                <NavLink to={tool.id}>{tool.name}</NavLink>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-col flex-1 gap-4 overflow-hidden h-full px-1">
          <Outlet />
        </div>
      </Suspense>
    </div>
  )
}
