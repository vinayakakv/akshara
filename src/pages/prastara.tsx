import { tokenizeKannada } from '../chandas-lib/tokenizer.ts'
import { useState } from 'react'
import { prastara, PrastaraItem } from '../chandas-lib/prastara.ts'
import { getAksharaGanaIdentifier } from '../chandas-lib/chandasIdentifier.ts'
import { KannadaTextArea } from '@/components/kannadaTextArea.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Card } from '@/components/ui/card.tsx'
import { twMerge } from 'tailwind-merge'
import { useAtomValue } from 'jotai'
import { languageHelpersAtom } from '@/state/languageState.ts'
import { splitArray, useDeferredValueWithLoading } from '@/lib/appUtils.ts'
import { Example, ExamplesDialog } from '@/components/examples.tsx'
import { Markdown } from '@/components/markdown.tsx'

const examples: Example<undefined>[] = [
  {
    name: 'Sanskrit Vrutta',
    caption:
      'A vrutta is a structure where each line repeats the same pattern. [source](https://sanskrit.iitk.ac.in/jnanasangraha/chanda/examples)',
    content: `
      विद्या नाम नरस्य रूपमधिकं प्रच्छन्नगुप्तं धनम्
      विद्या भोगकरी यशः सुखकरी विद्या गुरूणां गुरुः।
      विद्या बन्धुजनो विदेशगमने विद्या परा देवता
      विद्या राजसु पूज्यते न हि धनं विद्याविहीनः पशुः॥ 
    `,
  },
  {
    name: 'Kannada Vrutta',
    caption:
      'An extract from [_Pampabharatha_](https://kn.wikisource.org/wiki/%E0%B2%AA%E0%B2%82%E0%B2%AA%E0%B2%AD%E0%B2%BE%E0%B2%B0%E0%B2%A4_%E0%B2%8F%E0%B2%95%E0%B2%BE%E0%B2%A6%E0%B2%B6%E0%B2%BE%E0%B2%B6%E0%B3%8D%E0%B2%B5%E0%B2%BE%E0%B2%B8%E0%B2%82)',
    content: `
    ಉನ್ನತಮಸ್ತಕಸ್ಥಳದೊಳಂಬುಗಳೞ್ದುಡಿದಿರ್ದೊಡತ್ತಮಿ
    ತ್ತನ್ನೆರೆ ತಂದು ಬಲ್ದಡಿಗರಿೞ್ಕುೞನೊಳ್ ಕಿೞೆ ನೊಂದೆನೆನ್ನದ|
    ಎನ್ನದಣಂ ಮೊಗಂ ಮುರಿಯದಳ್ಕದೆ ಬೇನೆಗಳೊಳ್ ಮೊಗಂಗಳಂ
    ಬಿನ್ನಗೆ ಮಾಡದಿರ್ದರಳವಚ್ಚರಿಯಾಗೆ ಕೆಲರ್ ಮಹಾರಥರ್
    `,
  },
  {
    name: 'Malayalam Chandas Description',
    caption: `Description of _Keka_ Chandas. [source](https://thejinsight.blogspot.com/2012/03/malayalam-vrutham-malayalam.html)`,
    content: `
    മൂന്നും രണ്ടും രണ്ടും മൂന്നും രണ്ടും രണ്ടെന്നെഴുത്തുകൾ
    പതിന്നാലിന്നാറു ഗണം പാദം രണ്ടിലുമൊന്നുപോൽ
    ഗുരുവൊന്നെങ്കിലും വേണം മാറാതോരോ ഗണത്തിലും
    നടുക്കു യതി പാദാദിപ്പൊരുത്തമിതു കേകയാം
    `,
  },
]

const aksharaGanaIdentifier = getAksharaGanaIdentifier()

const PrastaraItemCard = ({ item }: { item: PrastaraItem }) => {
  const { t } = useAtomValue(languageHelpersAtom)
  return (
    <div
      className={twMerge(
        'flex flex-col items-center min-w-[1ch] flex-wrap p-2 rounded-md',
        item.value === 'laghu' && 'bg-amber-100 dark:bg-amber-900',
        item.value === 'guru' && 'bg-fuchsia-100 dark:bg-fuchsia-900',
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
    <div className="flex flex-col gap-2 p-2 bg-green-200 dark:bg-green-800 rounded-md">
      <span className="font-semibold text-xl">{t(name)}</span>
    </div>
  )
}

export const Prastara = () => {
  const [text, setText] = useState('')
  const { toKannada } = useAtomValue(languageHelpersAtom)

  const delayedText = useDeferredValueWithLoading(text)

  const kannadaText = toKannada(delayedText)

  const output = splitArray(
    prastara(tokenizeKannada(kannadaText.trim())),
    (it) => it.content.includes('\n'),
  )
  const aksharaGana = aksharaGanaIdentifier(output.flat())

  return (
    <>
      <div>
        <Markdown>
          This tool identifies the long and short notes (called _laghu_ and
          _guru_ respectively) and helps identify the underlying _Chandas_ that
          the poetry is written in.
        </Markdown>
        <ExamplesDialog
          examples={examples}
          onSelect={(content) => {
            setText(content)
          }}
        />
      </div>

      <Label className="flex flex-col gap-2 flex-1 min-w-60 basis-1/3">
        <span>Input</span>
        <KannadaTextArea
          name="input-tokenizer"
          className="flex-1"
          value={text}
          onChange={(text) => {
            setText(text)
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
