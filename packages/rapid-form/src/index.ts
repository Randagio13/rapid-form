import { useReducer } from 'react'
import reducer, { type State, initialState } from 'reducer.js'
import { type ValidationProps, validation } from 'validation.js'

/**
 * Rapid form hook
 */
export function useRapidForm(): {
  refValidation: (
    ref: HTMLFormElement | null,
    config?: ValidationProps['config']
  ) => void
  values: State['values']
  errors: State['errors']
} {
  const [state, dispatch] = useReducer(reducer, initialState)
  return {
    refValidation: (ref, config) => {
      validation({ ref, dispatch, config })
    },
    ...state
  }
}
