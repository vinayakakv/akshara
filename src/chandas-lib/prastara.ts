import { Token } from './tokenizer.ts'

export type PrastaraItem = {
  content: string
  value: 'laghu' | 'guru' | ''
}

export const prastara = (tokens: Token[]): PrastaraItem[] =>
  tokens
    //.filter((token) => token.isAkshara || token.isSpace)
    .map((currentToken, index, self) => {
      if (!currentToken.isAkshara) {
        return { content: currentToken.content, value: '' }
      }
      const nextToken = self.slice(index + 1).find((token) => token.isAkshara)
      if (currentToken.virama) {
        // We skip it as it is handled with previous text
      } else if (nextToken && (nextToken.samyukta || nextToken.virama)) {
        return {
          content: nextToken.virama
            ? currentToken.akshara + nextToken.akshara
            : currentToken.akshara,
          value: 'guru' as const,
        }
      } else if (currentToken.yogawaha) {
        return { content: currentToken.akshara, value: 'guru' as const }
      } else if (currentToken.svara) {
        return ['ಅ', 'ಇ', 'ಉ', 'ಋ', 'ಌ', 'ಎ', 'ಒ'].includes(currentToken.svara)
          ? { content: currentToken.akshara, value: 'laghu' as const }
          : { content: currentToken.akshara, value: 'guru' as const }
      } else if (currentToken.vyamjana) {
        return !currentToken.gunita ||
          ['\u0cbf', '\u0cc1', '\u0cc3', '\u0cc6', '\u0cca', '\u0ce2'].includes(
            currentToken.gunita,
          )
          ? { content: currentToken.akshara, value: 'laghu' as const }
          : { content: currentToken.akshara, value: 'guru' as const }
      } else {
        console.warn('Unhandled branch in prastara', currentToken, index)
      }
    })
    .filter(Boolean)
