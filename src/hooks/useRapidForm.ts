import { useReducer, SyntheticEvent } from 'react'
import fetchReducer from '../utils/fetchReducer'
import useValidation from './useValidation'
import resetAll from '../utils/reset'
import { resetInterface } from '../utils/reset'

export interface SubmitCallback {
  (data: object, errors: object, event?: SyntheticEvent<HTMLFormElement>): void
}

export default function useRapidForm(): any {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: {},
    errors: {}
  })
  const validation = useValidation(dispatch)
  const reset: resetInterface = e => {
    e.currentTarget.reset()
    resetAll(dispatch)
  }
  return {
    handleSubmit: (c: SubmitCallback) => (
      e: SyntheticEvent<HTMLFormElement>
    ) => {
      e.preventDefault()
      return c(state.data, state.errors, e)
    },
    errors: state.errors,
    validation,
    reset
  }
}
