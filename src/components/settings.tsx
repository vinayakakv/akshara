import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LanguagesIcon } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useAtom, useAtomValue } from 'jotai/index'
import { transliterationApiAtom } from '@/state/transliteration.ts'
import {
  autoDetectedLanguageAtom,
  inputLanguageAtom,
  isAutoDetectAtom,
  outputLanguageAtom,
} from '@/state/languageState.ts'

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

export const Settings = () => {
  const [open, setOpen] = useState(false)
  const [inputLanguage, setInputLanguage] = useAtom(inputLanguageAtom)
  const [outputLanguage, setOutputLanguage] = useAtom(outputLanguageAtom)
  const isAutoDetect = useAtomValue(isAutoDetectAtom)
  const autoDetectedLanguage = useAtomValue(autoDetectedLanguageAtom)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <LanguagesIcon className="h-5 w-5" />
            </Button>
          </DialogTrigger>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 text-sm">
          <p>
            Input Language:{' '}
            <span className="font-semibold">{inputLanguage}</span>{' '}
          </p>
          <p>
            Output Language:{' '}
            <span className="font-semibold">{outputLanguage}</span>{' '}
          </p>
          <p>
            Autodetected Language:{' '}
            <span className="font-semibold">
              {' '}
              {autoDetectedLanguage || 'None'}
            </span>
          </p>
        </HoverCardContent>
      </HoverCard>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label className="flex items-center justify-between gap-2">
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

          <Label className="flex items-center justify-between gap-2">
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
            <Label className="flex items-center justify-between gap-2 min-h-8">
              <p>Auto detected Language</p>
              <span>{autoDetectedLanguage || 'None'}</span>
            </Label>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}