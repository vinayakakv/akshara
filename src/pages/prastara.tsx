import { tokenizeKannada } from '../lib/tokenizer.ts'
import { useState } from 'react'
import { prastara, PrastaraItem } from '../lib/prastara.ts'

export const Prastara = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState<PrastaraItem[][]>([])
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
          setOutput(
            e.target.value.split('\n').map(tokenizeKannada).map(prastara),
          )
        }}
        placeholder="Please enter the input here"
      ></textarea>
      <div className="flex flex-col gap-1 flex-wrap overflow-auto">
        {output.map((line) => (
          <div className="flex flex-row gap-1" key={JSON.stringify(line)}>
            {line.map((token) => (
              <div
                className="flex flex-col items-center min-w-[1ch]"
                key={JSON.stringify(token)}
              >
                <span className="font-mono">
                  {token.value === 'guru'
                    ? '—'
                    : token.value === 'laghu'
                      ? '∪'
                      : ' '}
                </span>
                <span>{token.content}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
