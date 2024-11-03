import { PrastaraItem } from './prastara.ts'
import aksharaGanaData from '../data/aksharagana.json'
import { Trie } from '../lib/trie.ts'
import { tokenizeKannada } from './tokenizer.ts'

type ChandasIdentificationResult = {
  // The name of the chandas
  chandas: string
  // Pattern of the chandas
  pattern: string
  // Whether the given input string completely matches the chandas or not
  complete: boolean
  // Number of mismatches
  mismatchCount: number
  // Metadata about the chandas
  metadata: Record<string, any>
}[]

export const getAksharaGanaIdentifier = () => {
  const trie = new Trie<(typeof aksharaGanaData)[number]>(null)
  for (const item of aksharaGanaData) {
    const key = tokenizeKannada(item.pattern)
      .filter((token) => token.isAkshara)
      .map((token) => {
        if (!token.vyamjana) return
        if (token.vyamjana === 'ಲ') return '0'
        else if (token.vyamjana === 'ಗ') return '1'
        else
          return ['ನ', 'ಸ', 'ಜ', 'ಯ', 'ಭ', 'ರ', 'ತ', 'ಮ']
            .indexOf(token.vyamjana)
            .toString(2) // convert to binary
            .padStart(3, '0')
      })
      .filter(Boolean)
      .join('')
    trie.insert(key, item)
  }
  return (prastara: PrastaraItem[]): ChandasIdentificationResult => {
    // TODO: Add bit manipulation here
    const key = prastara
      .map((item) =>
        item.value === 'laghu' ? '0' : item.value === 'guru' ? '1' : '',
      )
      .join('')
    const chandas = trie.get(key)
    return chandas
      ? [
          {
            chandas: chandas.child_chandas,
            pattern: chandas.pattern,
            complete: true,
            mismatchCount: 0,
            metadata: chandas,
          },
        ]
      : []
  }
}
