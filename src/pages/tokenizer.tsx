import { Token, tokenizeKannada } from '../lib/tokenizer.ts'
import { useState } from 'react'

export const Tokenizer = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState<Token[]>([])
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
          setOutput(tokenizeKannada(e.target.value))
        }}
        placeholder="Please enter the input here"
      ></textarea>
      <div className="flex flex-row gap-2 flex-wrap overflow-auto">
        {output.map((token) => (
          <pre className="p-2 border">{JSON.stringify(token, null, 2)}</pre>
        ))}
      </div>
    </div>
  )
}
