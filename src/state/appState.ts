import { atom } from 'jotai'

export const loadingAtom = atom(false)

export const themeAtom = atom<'light' | 'dark'>(
  document.body.classList.contains('dark') ? 'dark' : 'light',
)
