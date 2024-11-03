import { useState } from 'react'
import { useTransliterate } from '../lib/aksharamukha.ts'

export const Transliterate = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')
  const { loading, transliterateApi } = useTransliterate()
  return loading ? (
    'Loading...'
  ) : (
    <div className="flex flex-col gap-2 overflow-hidden">
      <textarea
        name="input"
        className="border min-h-40"
        rows={3}
        cols={30}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          if (transliterateApi)
            setOutput(
              transliterateApi.process({
                from: 'autodetect',
                to: 'Kannada',
                input: e.target.value,
              }),
            )
          else console.warn('No transliterateApi')
        }}
        placeholder="Please enter the input here"
      ></textarea>
      <pre className="flex flex-col gap-1 flex-wrap overflow-auto">
        {output}
      </pre>
    </div>
  )
}
