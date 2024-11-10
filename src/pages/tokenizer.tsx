import { Token, tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import { useState } from 'react'
import { Label } from '@/components/ui/label.tsx'
import { KannadaTextArea } from '@/components/kannadaTextArea.tsx'
import ReactMarkdown from 'react-markdown'
import { Card } from '@/components/ui/card.tsx'
import { twMerge } from 'tailwind-merge'
import { useAtomValue } from 'jotai'
import { languageHelpersAtom } from '@/state/languageState.ts'
import { useDeferredValueWithLoading } from '@/lib/appUtils.ts'
import { Example, ExamplesDialog } from '@/components/examples.tsx'

const examples = [] satisfies Example<string>[]

const TokenCard = ({ token }: { token: Token }) => {
  const { t } = useAtomValue(languageHelpersAtom)
  return (
    <div
      className={twMerge(
        'bg-green-100 flex flex-col gap-2 place-items-center place-content-center p-2 rounded-md',
        token.isAkshara
          ? 'bg-green-100 dark:bg-green-900'
          : 'bg-red-100 dark:bg-red-900',
      )}
    >
      <span className="font-bold text-4xl">
        {token.isAkshara
          ? t(token.akshara)
          : token.content.replaceAll(/\s/g, '␣')}
      </span>
      <div className="contents text-sm">
        {token.isAkshara ? (
          <>
            <p>
              Akshara Type:{' '}
              <span className="font-semibold">
                {token.svara ? 'Swara' : 'Vyanjana'}
              </span>
            </p>
            <p>
              Has Samyukta?:{' '}
              <span className="font-semibold">
                {token.samyukta ? 'Yes' : 'No'}
              </span>
            </p>
            <p>
              Has Yogawaha?:{' '}
              <span className="font-semibold">
                {token.yogawaha ? 'Yes' : 'No'}
              </span>
            </p>
            <p>
              Gunita Component:{' '}
              <span className="font-semibold">
                {token.gunita ? t(token.gunita) : 'None'}
              </span>
            </p>
          </>
        ) : (
          <p className="font-semibold">
            {token.isSpace ? 'Space' : 'Not an Akshara'}
          </p>
        )}
      </div>
    </div>
  )
}

export const Tokenizer = () => {
  const [text, setText] = useState('')
  const [kannadaText, setKannadaText] = useState('')

  const delayedKannadaText = useDeferredValueWithLoading(kannadaText)
  const output = tokenizeKannada(delayedKannadaText)

  return (
    <>
      <div>
        <ReactMarkdown className="text-sm text-neutral-500 dark:text-neutral-400">
          This tool tokenizes the input text into _Akshara_ and its constituent
          parts. The original tokenizer is implemented for Kannada, but with the
          help of _Aksharamukha_, you can also use it for other Brahmic
          Languages or Romamizations.
        </ReactMarkdown>
        <ExamplesDialog examples={examples} onSelect={() => {}} />
      </div>
      <Label className="flex flex-col gap-2">
        <span>Input</span>
        <KannadaTextArea
          name="input-tokenizer"
          className="min-h-40"
          value={text}
          onChange={(text, kannadaText) => {
            setText(text)
            setKannadaText(kannadaText)
          }}
          placeholder="Provide the input text here"
        />
      </Label>
      <Label className="flex flex-col gap-2 overflow-hidden flex-1">
        <span>Output</span>
        <Card className="overflow-auto p-2 flex-1 grid grid-flow-row gap-2 [grid-template-rows:max-content] [grid-template-columns:repeat(auto-fill,minmax(15rem,1fr))]">
          {output.map((token, index) => (
            <TokenCard token={token} key={index} />
          ))}
        </Card>
      </Label>
    </>
  )
}
