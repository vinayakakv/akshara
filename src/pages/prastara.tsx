import { tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import { useState } from 'react'
import { prastara, PrastaraItem } from '../chandas-lib/prastara.ts'
import { getAksharaGanaIdentifier } from '../chandas-lib/chandasIdentifier.ts'
import { KannadaTextArea } from '@/components/kannadaTextArea.tsx'
import ReactMarkdown from 'react-markdown'
import { Label } from '@/components/ui/label.tsx'
import { Card } from '@/components/ui/card.tsx'
import { twMerge } from 'tailwind-merge'
import { useAtomValue } from 'jotai'
import { languageHelpersAtom } from '@/state/languageState.ts'
import { splitArray, useDeferredValueWithLoading } from '@/lib/appUtils.ts'
import { ExamplesDialog } from '@/components/examples.tsx'

const aksharaGanaIdentifier = getAksharaGanaIdentifier()

const PrastaraItemCard = ({ item }: { item: PrastaraItem }) => {
  const { t } = useAtomValue(languageHelpersAtom)
  return (
    <div
      className={twMerge(
        'flex flex-col items-center min-w-[1ch] flex-wrap',
        item.value === 'laghu' && 'bg-amber-100',
        item.value === 'guru' && 'bg-fuchsia-100',
      )}
    >
      <span className="font-mono">
        {item.value === 'guru' ? '—' : item.value === 'laghu' ? '∪' : ' '}
      </span>
      <span>{t(item.content)}</span>
    </div>
  )
}

const ChandasCard = ({ name }: { name: string }) => {
  const { t } = useAtomValue(languageHelpersAtom)
  return (
    <div className="flex flex-col gap-2 p-2 bg-green-200 rounded-md">
      <span className="font-semibold text-xl">{t(name)}</span>
    </div>
  )
}

export const Prastara = () => {
  const [text, setText] = useState('')
  const [kannadaText, setKannadaText] = useState('')

  const delayedKannadaText = useDeferredValueWithLoading(kannadaText)
  const output = splitArray(
    prastara(tokenizeKannada(delayedKannadaText.trim())),
    (it) => it.content.includes('\n'),
  )
  const aksharaGana = aksharaGanaIdentifier(output.flat())

  return (
    <>
      <div>
        <ReactMarkdown className="text-sm text-neutral-500 dark:text-neutral-400">
          This tool identifies the long and short notes (called _laghu_ and
          _guru_ respectively) and helps identify the underlying _Chandas_ that
          the poetry is written in.
        </ReactMarkdown>
        <ExamplesDialog examples={[]} onSelect={() => {}} />
      </div>

      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3">
        <span>Input</span>
        <KannadaTextArea
          name="input-tokenizer"
          className="flex-1"
          value={text}
          onChange={(text, kannadaText) => {
            setText(text)
            setKannadaText(kannadaText)
          }}
          placeholder="Provide the input text here"
        />
      </Label>
      <Label className="flex flex-col gap-2 flex-1 min-w-60 overflow-hidden basis-1/3">
        <span>Output</span>
        <Card className="flex flex-col gap-1 overflow-auto p-2 flex-1">
          {output.map((line, index) => (
            <div className="flex flex-row gap-1 flex-wrap" key={index}>
              {line.map((item, secondIndex) => (
                <PrastaraItemCard item={item} key={index * 10 + secondIndex} />
              ))}
            </div>
          ))}
        </Card>
      </Label>
      <Label className="flex flex-col gap-2 overflow-hidden">
        <span>Chandas Identification Result</span>
        <div className="flex flex-row flex-wrap min-h-12">
          {aksharaGana.length === 0 && (
            <span className="text-gray-600 text-xs font-light">
              No Chandas has been detected
            </span>
          )}
          {aksharaGana.map((item) => (
            <ChandasCard name={item.chandas} key={item.chandas} />
          ))}
        </div>
      </Label>
    </>
  )
}
