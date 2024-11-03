import { tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import { useContext, useDeferredValue, useEffect, useState } from 'react'
import { prastara, PrastaraItem } from '../chandas-lib/prastara.ts'
import { KannadaTextArea } from '../components/ui/textarea.tsx'
import { TransliterationContext } from '../lib/aksharamukha.ts'
import { getAksharaGanaIdentifier } from '../chandas-lib/chandasIdentifier.ts'
import { splitArray } from '../lib/utils.ts'

const aksharaGanaIdentifier = getAksharaGanaIdentifier()

export const Prastara = () => {
  const [text, setText] = useState('')
  const [kannadaText, setKannadaText] = useState('')
  const [output, setOutput] = useState<PrastaraItem[][]>([])

  const slowOutput = useDeferredValue(output)
  const slowInput = useDeferredValue(kannadaText)

  useEffect(() => {
    const result = prastara(tokenizeKannada(slowInput.trim()))
    setOutput(splitArray(result, (it) => it.content.includes('\n')))
  }, [slowInput])

  const { t } = useContext(TransliterationContext)
  const aksharaGana = aksharaGanaIdentifier(slowOutput.flat())
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
          setKannadaText(kannadaText)
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
      <pre>{JSON.stringify(aksharaGana, null, 2)}</pre>
    </div>
  )
}
