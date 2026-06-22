export type Span = Readonly<{ start: number; end: number }>
export type IsAdjacent = (left: number, right: number) => boolean

const isConsecutive: IsAdjacent = (left, right) => left + 1 === right

/**
 * Converts ordered numbers into inclusive spans.
 *
 * Input order is preserved. Sort the input first when numeric ordering is required.
 *
 * `isAdjacent` is assumed to be monotonic (only true when `left < right`); a rule
 * that accepts a smaller `right` on unsorted input can yield an inverted span
 * (`start > end`).
 */
export const rangeize = (
  values: readonly number[],
  isAdjacent: IsAdjacent = isConsecutive
): Span[] => {
  // Local accumulation only — the input is never mutated and each emitted Span is
  // a fresh frozen object, so the function stays pure to callers. Appending to a
  // local array keeps this O(n) instead of the O(n^2) of spreading on every split.
  const spans: Span[] = []
  let current: Span | null = null

  for (const value of values) {
    if (current === null) {
      current = { start: value, end: value }
      continue
    }

    if (isAdjacent(current.end, value)) {
      current = { start: current.start, end: value }
      continue
    }

    spans.push(current)
    current = { start: value, end: value }
  }

  if (current !== null) {
    spans.push(current)
  }

  return spans
}
