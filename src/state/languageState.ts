import { atom } from 'jotai'
import { transliterationApiAtom } from '@/state/transliteration.ts'

export const inputLanguageAtom = atom('autodetect')

export const outputLanguageAtom = atom('Kannada')

export const languageHelpersAtom = atom(async (get) => {
  const transliterationApi = await get(transliterationApiAtom)
  const outputLanguage = get(outputLanguageAtom)
  const inputLanguage = get(inputLanguageAtom)
  return {
    t: (input: string) =>
      input
        ? transliterationApi.process({
            from: 'Kannada',
            to: outputLanguage,
            input,
          })
        : input,
    toKannada: (input: string) =>
      input
        ? transliterationApi.process({
            from: inputLanguage,
            to: 'Kannada',
            input,
          })
        : input,
  }
})

export const isAutoDetectAtom = atom(
  (get) => get(inputLanguageAtom) === 'autodetect',
)

export const autoDetectedLanguageAtom = atom('')
