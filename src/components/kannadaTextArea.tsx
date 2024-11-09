import * as React from 'react'
import { useTransliteration } from '../lib/aksharamukha.ts'
import { Textarea } from './ui/textarea.tsx'

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
  const { language, setLanguage, transliterateApi } = useTransliteration()
  return (
    <Textarea
      ref={ref}
      {...props}
      onChange={(e) => {
        const value = e.target.value
        if (!value) setLanguage('')
        let currentLanguage = language
        if (!language) {
          currentLanguage = transliterateApi.autoDetect(value)
          setLanguage(currentLanguage)
        }
        onChange?.(
          value,
          transliterateApi.process({
            from: currentLanguage,
            to: 'Kannada',
            input: value,
          }),
          e,
        )
      }}
    />
  )
})
