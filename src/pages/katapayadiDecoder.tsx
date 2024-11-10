import { useState } from 'react'
import { tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import { katapayadiDecoder } from '../chandas-lib/katapayadiDecoder.ts'

import { KannadaTextArea } from '@/components/kannadaTextArea.tsx'

export const KatapayadiDecoder = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')
  return (
    <>
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
    </>
  )
}
