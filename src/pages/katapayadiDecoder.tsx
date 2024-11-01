import { useState } from 'react'
import { tokenizeKannada } from '../lib/tokenizer.ts'
import { katapayadiDecoder } from '../lib/katapayadiDecoder.ts'

export const KatapayadiDecoder = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <textarea
        name="input"
        className="border min-h-40"
        rows={3}
        cols={30}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setOutput(katapayadiDecoder(tokenizeKannada(e.target.value)))
        }}
        placeholder="Please enter the input here"
      ></textarea>
      <div className="flex flex-col gap-1 flex-wrap overflow-auto">
        {output}
      </div>
    </div>
  )
}
