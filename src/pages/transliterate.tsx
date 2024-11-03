import { useContext, useState } from 'react'
import { TransliterationContext } from '../lib/aksharamukha.ts'

export const Transliterate = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')
  const { toKannada, language, setLanguage, transliterateApi } = useContext(
    TransliterationContext,
  )
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <textarea
        name="input"
        className="border min-h-40"
        rows={3}
        cols={30}
        value={text}
        onChange={(e) => {
          const value = e.target.value
          setText(value)
          if (!value) setLanguage('')
          if (!language) setLanguage(transliterateApi.autoDetect(value))
          setOutput(toKannada(value))
        }}
        placeholder="Please enter the input here"
      ></textarea>
      <pre className="flex flex-col gap-1 flex-wrap overflow-auto">
        {output}
      </pre>
    </div>
  )
}
