import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { useContext } from 'react'
import { TransliterationContext } from '../../lib/aksharamukha.ts'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={twMerge(
          `flex min-h-[60px] w-full
           rounded-md border border-neutral-200
           bg-transparent px-3 py-2 text-sm shadow-sm 
           placeholder:text-neutral-500 focus-visible:outline-none
           focus-visible:ring-1 focus-visible:ring-neutral-950
           disabled:cursor-not-allowed disabled:opacity-50
           dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

export const KannadaTextArea = React.forwardRef<
  HTMLTextAreaElement,
  Omit<TextareaProps, 'onChange'> & {
    onChange?: (
      text: string,
      kannadaText: string,
      e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => void | Promise<void>
  }
>(({ onChange, ...props }, ref) => {
  const { language, setLanguage, transliterateApi } = useContext(
    TransliterationContext,
  )
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
