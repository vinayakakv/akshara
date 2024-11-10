import { atom } from 'jotai'

export const loadingAtom = atom(false)

export const themeAtom = atom<'light' | 'dark'>('dark')
