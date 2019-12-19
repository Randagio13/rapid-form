import { useReducer } from 'react'
import fetchReducer from '../utils/fetchReducer'
import { useValidation } from './useValidation'
import resetAll from '../utils/reset'

export default function useRapidForm(): any {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: {},
    errors: {}
  })
  const validation = useValidation(dispatch)
  const reset = () => resetAll(dispatch)
  return {
    handleSubmit: (c: any) => (e: any) => {
      e.preventDefault()
      return c(state.data, state.errors, e)
    },
    data: state.data,
    errors: state.errors,
    validation,
    reset
  }
}
