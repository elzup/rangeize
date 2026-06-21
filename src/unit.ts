export type Span = Readonly<{ start: number; end: number }>
export type IsAdjacent = (left: number, right: number) => boolean

type State = Readonly<{
  current: Span | null
  completed: readonly Span[]
}>

const isConsecutive: IsAdjacent = (left, right) => left + 1 === right

const appendNumber = (state: State, value: number, isAdjacent: IsAdjacent): State => {
  if (state.current === null) {
    return { current: { start: value, end: value }, completed: state.completed }
  }

  if (isAdjacent(state.current.end, value)) {
    return { current: { ...state.current, end: value }, completed: state.completed }
  }

  return {
    current: { start: value, end: value },
    completed: [...state.completed, state.current],
  }
}

/**
 * Converts ordered numbers into inclusive spans.
 *
 * Input order is preserved. Sort the input first when numeric ordering is required.
 */
export const unspan = (
  values: readonly number[],
  isAdjacent: IsAdjacent = isConsecutive,
): Span[] => {
  const state = values.reduce<State>(
    (currentState, value) => appendNumber(currentState, value, isAdjacent),
    { current: null, completed: [] },
  )

  return state.current === null ? [] : [...state.completed, state.current]
}
