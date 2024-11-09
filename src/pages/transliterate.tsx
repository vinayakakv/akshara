import { useState } from 'react'

import { KannadaTextArea } from '../components/kannadaTextArea.tsx'

export const Transliterate = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState('')
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <KannadaTextArea
        name="input"
        rows={3}
        cols={30}
        value={text}
        onChange={(text, kannadaText) => {
          setText(text)
          setOutput(kannadaText)
        }}
        placeholder="Please enter the input here"
      />
      <pre className="flex flex-col gap-1 flex-wrap overflow-auto">
        {output}
      </pre>
    </div>
  )
}
