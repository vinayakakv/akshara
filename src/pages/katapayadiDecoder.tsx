import { useDeferredValue, useState } from 'react'
import { tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import {
  katapayadiDecoder,
  KatapayadiToken,
} from '../chandas-lib/katapayadiDecoder.ts'

import { KannadaTextArea } from '@/components/kannadaTextArea.tsx'
import ReactMarkdown from 'react-markdown'
import { Label } from '@/components/ui/label.tsx'
import { useAtomValue } from 'jotai'
import { languageHelpersAtom } from '@/state/languageState.ts'
import { twMerge } from 'tailwind-merge'
import { Switch } from '@/components/ui/switch.tsx'

const KatapayadiTokenCard = ({ token }: { token: KatapayadiToken }) => {
  const { t } = useAtomValue(languageHelpersAtom)
  return (
    token.valid && (
      <div
        className={twMerge(
          'flex flex-col gap-1 p-2 rounded-lg items-center',
          token.varga === 'ka' && 'bg-fuchsia-200',
          token.varga === 'ta' && 'bg-blue-200',
          token.varga === 'pa' && 'bg-violet-200',
          token.varga === 'ya' && 'bg-amber-200',
          token.varga === 'swara' && 'bg-indigo-200',
          token.varga === 'nasika' && ' bg-green-200',
        )}
      >
        <span>{token.value}</span>
        <span className="text-xl">{t(token.content)}</span>
      </div>
    )
  )
}

export const KatapayadiDecoder = () => {
  const [text, setText] = useState('')
  const [kannadaText, setKannadaText] = useState('')
  const delayedKannadaText = useDeferredValue(kannadaText)

  const output = katapayadiDecoder(tokenizeKannada(delayedKannadaText))

  const [reverse, setReverse] = useState(false)

  const outputString = output
    .map((token) => (token.valid ? token.value : token.content))
    .join('')
    .replaceAll(/(\s+|[^,\d])/g, '')
    .split(',')
    .map((chunk) => (reverse ? chunk.split('').reverse().join('') : chunk))
    .join(',')

  return (
    <>
      <ReactMarkdown className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        This tool converts the Indic text into a numeric value using the
        _Katapayadi_ decoding scheme, where each letter is given a numeric value
        based on its position.
      </ReactMarkdown>
      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3">
        <span>Input</span>
        <KannadaTextArea
          name="input"
          className="flex-1"
          value={text}
          onChange={(text, kannadaText) => {
            setText(text)
            setKannadaText(kannadaText)
          }}
          placeholder="Please enter the input here"
        />
      </Label>
      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3">
        <span>Parsing</span>
        <div className="flex flex-row gap-2 flex-wrap">
          {output.map((token, index) => (
            <KatapayadiTokenCard token={token} key={index} />
          ))}
        </div>
      </Label>
      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3">
        <span>Output</span>
        <p className="flex flex-col gap-1 flex-wrap overflow-auto font-semibold text-2xl">
          {outputString}
        </p>
      </Label>
      <Label className="flex flex-row gap-2 mt-auto items-center">
        <span>Reverse numbers</span>{' '}
        <Switch checked={reverse} onCheckedChange={setReverse} />
      </Label>
    </>
  )
}
