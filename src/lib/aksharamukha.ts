import { loadPyodide } from 'pyodide'
import { createContext, useEffect, useState } from 'react'

interface TransliterateApi {
  process: (args: {
    from: string
    to: string
    input: string
    opts?: object
  }) => string
  autoDetect: (input: string) => string
}

const getTransliterate = async () => {
  try {
    const pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.3/full/',
      packages: ['micropip'],
    })
    const micropip = pyodide.pyimport('micropip')
    await micropip.add_mock_package('marisa-trie', '1.2.1')
    await micropip.add_mock_package('jaconv', '0.4.0')
    await micropip.add_mock_package('pykakasi', '2.3.0')
    await micropip.install('aksharamukha', {
      keep_going: true,
    })
    const transliterate = await pyodide.pyimport('aksharamukha.transliterate')
    return {
      process: ({ from, to, input }) => transliterate.process(from, to, input),
      autoDetect: (input) => transliterate.auto_detect(input),
    } satisfies TransliterateApi
  } catch (e) {
    console.error(e)
    return null
  }
}

export const useTransliterate = () => {
  const [transliterateApi, setTransliterateApi] =
    useState<TransliterateApi | null>(null)
  useEffect(() => {
    getTransliterate().then((t) => {
      setTransliterateApi(() => t)
    })
  }, [])
  return { transliterateApi }
}

type TransliterationContextValue = {
  language: string
  setLanguage: (language: string) => void
  toKannada: (input: string) => string
  t: (input: string) => string
  transliterateApi: TransliterateApi
}

export const TransliterationContext =
  createContext<TransliterationContextValue>({
    language: '',
    setLanguage: () => {
      throw new Error('TransliterationContext not initialized yet')
    },
    toKannada: () => {
      throw new Error('TransliterationContext not initialized yet')
    },
    t: () => {
      throw new Error('TransliterationContext not initialized yet')
    },
    transliterateApi: {
      process: () => {
        throw new Error('TransliterationContext not initialized yet')
      },
      autoDetect: () => {
        throw new Error('TransliterationContext not initialized yet')
      },
    },
  })
