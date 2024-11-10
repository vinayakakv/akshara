import { atom } from 'jotai'
import { getTransliterate } from '@/lib/aksharamukha.ts'

export const transliterationApiAtom = atom(async () => await getTransliterate())
