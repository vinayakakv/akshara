import * as React from 'react'
import { Textarea } from './ui/textarea.tsx'
import {
  autoDetectedLanguageAtom,
  inputLanguageAtom,
} from '@/state/languageState.ts'
import { useAtom, useAtomValue } from 'jotai'
import { transliterationApiAtom } from '@/state/transliteration.ts'

export const KannadaTextArea = React.forwardRef<
  HTMLTextAreaElement,
  Omit<React.ComponentProps<'textarea'>, 'onChange'> & {
    onChange?: (
      text: string,
      kannadaText: string,
      e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => void | Promise<void>
  }
>(({ onChange, ...props }, ref) => {
  const transliterateApi = useAtomValue(transliterationApiAtom)
  const [autoDetectedLanguage, setAutoDetectedLanguage] = useAtom(
    autoDetectedLanguageAtom,
  )
  const inputLanguage = useAtomValue(inputLanguageAtom)
  return (
    <Textarea
      ref={ref}
      {...props}
      onChange={(e) => {
        const value = e.target.value
        if (!autoDetectedLanguage && value) {
          setAutoDetectedLanguage(transliterateApi.autoDetect(value))
        }
        onChange?.(
          value,
          value
            ? transliterateApi.process({
                from: inputLanguage,
                to: 'Kannada',
                input: value,
              })
            : '',
          e,
        )
      }}
    />
  )
})
