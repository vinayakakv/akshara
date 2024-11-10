import { useDeferredValue, useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { loadingAtom } from '@/state/appState.ts'

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

export const useDeferredValueWithLoading = <T>(value: T) => {
  const deferredValue = useDeferredValue(value)
  const setLoadingAtom = useSetAtom(loadingAtom)
  useEffect(() => {
    setLoadingAtom(value !== deferredValue)
  }, [value, deferredValue])
  return deferredValue
}
