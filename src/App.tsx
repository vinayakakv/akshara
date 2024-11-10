import { useEffect, Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Label } from '@/components/ui/label.tsx'
import { ReloadIcon } from '@radix-ui/react-icons'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { transliterationApiAtom } from '@/state/transliteration.ts'
import { useAtomValue, useAtom, useSetAtom } from 'jotai'
import {
  autoDetectedLanguageAtom,
  inputLanguageAtom,
  isAutoDetectAtom,
  outputLanguageAtom,
} from '@/state/languageState.ts'
import { loadingAtom } from '@/state/appState.ts'

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

const LanguageSelectList = () => {
  const transliterateApi = useAtomValue(transliterationApiAtom)
  return (
    <>
      <SelectGroup>
        <SelectLabel>Indian Main</SelectLabel>
        {(transliterateApi.languages.get('IndianMain') || []).map(
          (language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ),
        )}
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Roman Diacritic</SelectLabel>
        {(transliterateApi.languages.get('RomanDiacritic') || []).map(
          (language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ),
        )}
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Roman Non-Diacritic</SelectLabel>
        {(transliterateApi.languages.get('RomanNonDiacritic') || []).map(
          (language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ),
        )}
      </SelectGroup>
    </>
  )
}

const LanguageSelectors = () => {
  const [inputLanguage, setInputLanguage] = useAtom(inputLanguageAtom)
  const [outputLanguage, setOutputLanguage] = useAtom(outputLanguageAtom)
  const isAutoDetect = useAtomValue(isAutoDetectAtom)
  const autoDetectedLanguage = useAtomValue(autoDetectedLanguageAtom)
  return (
    <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
      <Label className="flex items-center gap-x-2">
        <p>Input Language</p>
        <Select value={inputLanguage} onValueChange={setInputLanguage}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Select Input Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="autodetect">Auto Detect</SelectItem>
            <SelectSeparator />
            <LanguageSelectList />
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex items-center gap-x-2">
        <p>Output Language</p>
        <Select value={outputLanguage} onValueChange={setOutputLanguage}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Select Output Language" />
          </SelectTrigger>
          <SelectContent>
            <LanguageSelectList />
          </SelectContent>
        </Select>
      </Label>

      {isAutoDetect && (
        <Label className="flex items-center gap-x-2">
          <p>Auto detected Language: </p>
          <span>{autoDetectedLanguage}</span>
        </Label>
      )}
    </div>
  )
}

const StatusIndicator = () => {
  const loading = useAtomValue(loadingAtom)
  return (
    <div className="flex items-center text-sm">
      {loading ? (
        <>
          <ReloadIcon className="mr-2 h-3 w-3 animate-spin stroke-yellow-600" />
          <span className="text-yellow-600">Processing</span>
        </>
      ) : (
        <span className="text-green-500">Idle</span>
      )}
    </div>
  )
}

const StatusBar = () => (
  <div className="border-t p-2 flex flex-wrap gap-x-4 gap-y-2 text-xs justify-between text-neutral-500 mt-auto dark:text-neutral-400">
    <LanguageSelectors />
    <StatusIndicator />
  </div>
)

export const App = () => {
  const setAutoDetectedLanguageAtom = useSetAtom(autoDetectedLanguageAtom)

  const { pathname } = useLocation()

  useEffect(() => {
    setAutoDetectedLanguageAtom('')
  }, [pathname])

  return (
    <div className="h-full flex flex-col p-4 gap-4 overflow-hidden">
      <h1 className="text-xl font-bold px-1">Akshara Tools</h1>
      {/*TODO: Add a loading fallback and error overlay*/}
      <Suspense>
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
        <StatusBar />
      </Suspense>
    </div>
  )
}
