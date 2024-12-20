import { useState } from 'react'

import { KannadaTextArea } from '@/components/kannadaTextArea.tsx'
import { useAtomValue } from 'jotai'
import { languageHelpersAtom } from '@/state/languageState.ts'
import { Label } from '@/components/ui/label.tsx'
import { Card } from '@/components/ui/card.tsx'
import { useDeferredValueWithLoading } from '@/lib/appUtils.ts'
import { Markdown } from '@/components/markdown.tsx'

export const Transliterate = () => {
  const [text, setText] = useState('')
  const [kannadaText, setKannadaText] = useState('')
  const delayedKannadaText = useDeferredValueWithLoading(kannadaText)

  const { t } = useAtomValue(languageHelpersAtom)
  const result = t(delayedKannadaText)
  return (
    <>
      <div>
        <Markdown>
          This tool transliterates one Indic script or a Romanization Scheme
          into another. This tool is here for debugging purposes only. Use
          [Aksharamukha](https://www.aksharamukha.com/converter) for a
          full-fledged experience.
        </Markdown>
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
          <pre>{result}</pre>
        </Card>
      </Label>
    </>
  )
}
