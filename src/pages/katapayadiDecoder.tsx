import { useState } from 'react'
import { tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import {
  katapayadiDecoder,
  KatapayadiToken,
} from '../chandas-lib/katapayadiDecoder.ts'

import { KannadaTextArea } from '@/components/kannadaTextArea.tsx'
import { Label } from '@/components/ui/label.tsx'
import { useAtomValue } from 'jotai'
import { languageHelpersAtom } from '@/state/languageState.ts'
import { twMerge } from 'tailwind-merge'
import { Switch } from '@/components/ui/switch.tsx'
import { useDeferredValueWithLoading } from '@/lib/appUtils.ts'
import { Example, ExamplesDialog } from '@/components/examples.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Markdown } from '@/components/markdown.tsx'

const examples: Example<{ reverse: boolean }>[] = [
  {
    name: 'Value of Pi',
    caption:
      'Encodes the value of π -- First value is the diameter of the circle, and third value is its circumference',
    content: `
    അനൂനനൂന്നാനനനുന്നനിത്യൈ,
    സ്സമാഹതാശ്ചക്രകലാവിഭക്താഃ,
    ചണ്ഡാംശുചന്ദ്രാധമകുംഭിപാലൈര്‍,
    വ്യാസസ്തദര്‍ദ്ധം ത്രിഭമൗര്‍വിക സ്യാത്‌
    `,
    data: {
      reverse: true,
    },
  },
  {
    name: 'Value of Pi',
    content: `भद्राम्बुद्धिसिद्धजन्मगणितश्रद्धा स्म यद् भूपगीः`,
    data: {
      reverse: true,
    },
  },
  {
    name: 'Value of Pi',
    content: `
    ಗೋಪೀಭಾಗ್ಯಮಧುವ್ರಾತ-ಶೃಂಗಿಶೋದಧಿಸಂಧಿಗ ||
    ಖಲಜೀವಿತಖಾತಾವ ಗಲಹಾಲಾರಸಂಧರ ||
    `,
    data: {
      reverse: false,
    },
  },
  {
    name: 'Marking a date',
    caption:
      'The number of days since the begining of _Kaliyuga_ when writing of [Narayaniyam](https://www.namboothiri.com/articles/katapayaadi.htm#Representation_of_dates) was completed.',
    content: `āyurārogyasaukhyam`,
    data: {
      reverse: true,
    },
  },
  {
    name: 'Marking a date',
    caption:
      'The number of days since the begining of Kaliyuga when Śaṃkarācārya introduced several reforms [source](https://web.archive.org/web/20090906215627/http://findarticles.com/p/articles/mi_m1310/is_1989_Nov/ai_8171045/)',
    content: `ಆಚಾರ್ಯವಾಗಭೇದ್ಯಾ`,
    data: {
      reverse: true,
    },
  },
  {
    name: `Memorization`,
    caption: 'Encodes number of days in 12 months of Gregorian Calander',
    content: `
    പല,ഹാരേ, പാലു, നല്ലൂ, പുല,ര്‍ന്നാലോ, കല,ക്കിലാം,
    ഇല്ലാ, പാലെ,ന്നു ഗോ,പാലന്‍ ,– ആംഗ്ലമാസദിനം ക്രമാല്‍
    `,
    data: {
      reverse: true,
    },
  },
]

const KatapayadiTokenCard = ({ token }: { token: KatapayadiToken }) => {
  const { t } = useAtomValue(languageHelpersAtom)
  return token.valid ? (
    <div
      className={twMerge(
        'flex flex-col gap-1 p-2 rounded-lg items-center',
        token.varga === 'ka' && 'bg-fuchsia-200 dark:bg-fuchsia-800',
        token.varga === 'ta' && 'bg-blue-200 dark:bg-blue-800',
        token.varga === 'pa' && 'bg-violet-200 dark:bg-violet-800',
        token.varga === 'ya' && 'bg-amber-200 dark:bg-amber-800',
        token.varga === 'swara' && 'bg-indigo-200 dark:bg-amber-800',
      )}
    >
      <span>{token.value}</span>
      <span className="text-xl">{t(token.content)}</span>
    </div>
  ) : (
    <div className="flex flex-col gap-1 p-2 rounded-lg items-center bg-red-200 dark:bg-red-800">
      <span>-</span>
      <span className="text-xl">{t(token.content)}</span>
    </div>
  )
}

export const KatapayadiDecoder = () => {
  const [text, setText] = useState('')
  const delayedText = useDeferredValueWithLoading(text)

  const { toKannada } = useAtomValue(languageHelpersAtom)
  const kannadaText = toKannada(delayedText)
  const output = katapayadiDecoder(tokenizeKannada(kannadaText))

  const [reverse, setReverse] = useState(false)
  const delayedReverse = useDeferredValueWithLoading(reverse)

  const outputString = output
    .map((token) => (token.valid ? token.value : token.content))
    .join('')
    .replaceAll(/(\s+|[^,\d])/g, '')
    .split(',')
    .map((chunk) =>
      delayedReverse ? chunk.split('').reverse().join('') : chunk,
    )
    .join(',')

  return (
    <>
      <div>
        <Markdown>
          This tool converts the Indic text into a numeric value using the
          _Katapayadi_ decoding scheme, where each letter is given a numeric
          value based on its position. Use `,` to break the individual numbers.
        </Markdown>
        <ExamplesDialog
          examples={examples}
          onSelect={(content, data) => {
            setText(content)
            setReverse(data.reverse)
          }}
        />
      </div>
      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3">
        <span>Input</span>
        <KannadaTextArea
          className="flex-1"
          value={text}
          onChange={(text) => {
            setText(text)
          }}
          placeholder="Please enter the input here"
        />
      </Label>
      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3 overflow-hidden">
        <span>Parsing</span>
        <Card className="p-2 overflow-auto flex-1">
          <div className="flex flex-row gap-2 flex-wrap">
            {output.map((token, index) => (
              <KatapayadiTokenCard token={token} key={index} />
            ))}
          </div>
        </Card>
      </Label>
      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3">
        <span>Output</span>
        <p className="flex flex-col gap-1 flex-wrap overflow-auto font-semibold text-2xl">
          {outputString}
        </p>
      </Label>
      <Label className="flex flex-row gap-2 mt-auto pb-2 items-center">
        <span>Reverse numbers</span>{' '}
        <Switch checked={reverse} onCheckedChange={setReverse} />
      </Label>
    </>
  )
}
