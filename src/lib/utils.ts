import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const splitArray = <T>(
  arr: T[],
  condition: (element: T) => boolean,
): T[][] => {
  const result: T[][] = []
  let currentChunk: T[] = []

  for (const item of arr) {
    if (condition(item)) {
      if (currentChunk.length > 0) {
        result.push(currentChunk)
        currentChunk = []
      }
      continue // Skip items that match the condition
    }
    currentChunk.push(item)
  }
  if (currentChunk.length > 0) {
    result.push(currentChunk)
  }
  return result
}
