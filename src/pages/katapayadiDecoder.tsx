import { useState } from 'react'
import { tokenizeKannada } from '../lib/tokenizer.ts'
import { katapayadiDecoder } from '../lib/katapayadiDecoder.ts'
import { KannadaTextArea } from '../components/ui/textarea.tsx'

export const KatapayadiDecoder = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <KannadaTextArea
        name="input"
        className="min-h-40"
        rows={3}
        cols={30}
        value={text}
        onChange={(text, kannadaText) => {
          setText(text)
          setOutput(katapayadiDecoder(tokenizeKannada(kannadaText)))
        }}
        placeholder="Please enter the input here"
      ></KannadaTextArea>
      <div className="flex flex-col gap-1 flex-wrap overflow-auto">
        {output}
      </div>
    </div>
  )
}