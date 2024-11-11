import { Token } from './tokenizer.ts'

export type KatapayadiToken =
  | {
      valid: true
      content: string
      value: number
      varga: 'ka' | 'ta' | 'pa' | 'ya' | 'swara'
    }
  | {
      valid: false
      content: string
    }

const ord = (c: string) => c.charCodeAt(0)

export const katapayadiDecoder = (tokens: Token[]): KatapayadiToken[] =>
  tokens
    .map((token) => {
      if (!token.isAkshara)
        return {
          valid: false as const,
          content: token.content,
        }
      if (!token.vyamjana)
        return {
          valid: true as const,
          content: token.akshara,
          value: 0,
          varga: 'swara' as const,
        }
      const char = ord(token.vyamjana)
      if (token.virama) return null
      else if (char >= ord('ಕ') && char <= ord('ಞ'))
        return {
          valid: true as const,
          content: token.akshara,
          value: (char - ord('ಕ') + 1) % 10,
          varga: 'ka' as const,
        }
      else if (char >= ord('ಟ') && char <= ord('ನ'))
        return {
          valid: true as const,
          content: token.akshara,
          value: (char - ord('ಟ') + 1) % 10,
          varga: 'ta' as const,
        }
      else if (char >= ord('ಪ') && char <= ord('ಮ'))
        return {
          valid: true as const,
          content: token.akshara,
          value: char - ord('ಪ') + 1,
          varga: 'pa' as const,
        }
      else if (char >= ord('ಯ') && char <= ord('ಹ'))
        return {
          valid: true as const,
          content: token.akshara,
          value:
            ['ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ']
              .map(ord)
              .indexOf(char) + 1,
          varga: 'ya' as const,
        }
    })
    .filter(Boolean)
