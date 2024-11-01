const swara = '[\u0c85-\u0c94\u0ce0\u0ce1]'
const vyanjana = '[\u0c95-\u0cb9\u0cde]'
const halant = '\u0ccd'
const vowelSigns = '[\u0cbe-\u0ccc]'
const anuswara = '\u0c82'
const visarga = '\u0c83'

// TODO: Add named capturing subgroups
const expression = new RegExp(
  `(?:(${swara})|((?:${vyanjana}${halant})*)(${vyanjana})(?:(${vowelSigns})|(${halant}))?)(${anuswara}|${visarga})?`,
  'g',
)

type AksharaComponents = {
  svara: string
  samyukta: string
  vyamjana: string
  gunita: string
  virama: string
  yogawaha: string
}

const isSpace = (text: string) => Boolean(text.match(/^\s+$/g))

export type Token =
  | ({ isAkshara: true; akshara: string } & Partial<AksharaComponents>)
  | { isAkshara: false; content: string; isSpace: boolean }

export const tokenizeKannada = (input: string) => {
  const tokens: Token[] = []
  let lastEndIndex = 0
  for (const match of input.matchAll(expression)) {
    if (match.index !== lastEndIndex) {
      const remaining = input.substring(lastEndIndex, match.index)
      tokens.push({
        isAkshara: false,
        content: remaining,
        isSpace: isSpace(remaining),
      })
    }
    lastEndIndex = match.index + match[0].length
    tokens.push({
      isAkshara: true,
      akshara: match[0],
      svara: match[1],
      samyukta: match[2],
      vyamjana: match[3],
      gunita: match[4],
      virama: match[5],
      yogawaha: match[6],
    })
  }
  if (lastEndIndex < input.length) {
    const content = input.substring(lastEndIndex, input.length)
    tokens.push({
      isAkshara: false,
      content,
      isSpace: isSpace(content),
    })
  }
  return tokens
}
