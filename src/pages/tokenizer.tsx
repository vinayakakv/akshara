import { Token, tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import { useState } from 'react'
import { KannadaTextArea } from '../components/ui/textarea.tsx'

export const Tokenizer = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState<Token[]>([])
  return (
    <div className="flex flex-col gap-2 overflow-hidden h-full">
      <KannadaTextArea
        name="input"
        className="border min-h-40"
        rows={3}
        cols={30}
        value={text}
        onChange={(text, kannadaText) => {
          setText(text)
          setOutput(tokenizeKannada(kannadaText))
        }}
        placeholder="Please enter the input here"
      />
      <div className="flex flex-row gap-2 flex-wrap overflow-auto">
        {output.map((token, index) => (
          <pre className="p-2 border" key={index}>
            {JSON.stringify(token, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  )
}
