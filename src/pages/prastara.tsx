import { tokenizeKannada } from '../lib/tokenizer.ts'
import { useContext, useState } from 'react'
import { prastara, PrastaraItem } from '../lib/prastara.ts'
import { KannadaTextArea } from '../components/ui/textarea.tsx'
import { TransliterationContext } from '../lib/aksharamukha.ts'

export const Prastara = () => {
  const [text, setText] = useState('')
  const [output, setOutput] = useState<PrastaraItem[][]>([])
  const { t } = useContext(TransliterationContext)
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <KannadaTextArea
        name="input"
        className="border min-h-40"
        rows={3}
        cols={30}
        value={text}
        onChange={(text, kannadaText) => {
          setText(text)
          setOutput(kannadaText.split('\n').map(tokenizeKannada).map(prastara))
        }}
        placeholder="Please enter the input here"
      />
      <div className="flex flex-col gap-1 flex-wrap overflow-auto">
        {output.map((line, index) => (
          <div className="flex flex-row gap-1" key={index}>
            {line.map((token, secondIndex) => (
              <div
                className="flex flex-col items-center min-w-[1ch]"
                key={index * 10 + secondIndex}
              >
                <span className="font-mono">
                  {token.value === 'guru'
                    ? '—'
                    : token.value === 'laghu'
                      ? '∪'
                      : ' '}
                </span>
                <span>{t(token.content)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
