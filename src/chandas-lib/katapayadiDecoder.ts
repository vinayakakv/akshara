import { Token } from './tokenizer.ts'

export const katapayadiDecoder = (tokens: Token[], reverse = false): string => {
  const ord = (c: string) => c.charCodeAt(0)
  const decoded = tokens
    .filter((token) => token.isAkshara)
    .map((token) => {
      if (!token.vyamjana) return 0
      const char = ord(token.vyamjana)
      if (token.virama) return null
      else if (char >= ord('ಕ') && char < ord('ಞ')) return char - ord('ಕ') + 1
      else if (char >= ord('ಟ') && char < ord('ನ')) return char - ord('ಟ') + 1
      else if (char >= ord('ಪ') && char <= ord('ಮ')) return char - ord('ಪ') + 1
      else if (char >= ord('ಯ') && char <= ord('ಹ'))
        return (
          ['ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ'].map(ord).indexOf(char) +
          1
        )
    })
    .filter(Boolean)
    .join('')
  return reverse ? decoded.split('').reverse().join('') : decoded
}
