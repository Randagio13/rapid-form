import { useCallback, useDebugValue, useReducer } from 'react'
import fetchReducer from '../utils/fetchReducer'
import handleChange from '../utils/handleChange'

export const useValidation = (dispatch: any) =>
  useCallback(
    (ref: any): void => {
      ref.oninput = (e: React.ChangeEvent<any>) => handleChange(e, dispatch)
    },
    [dispatch]
  )

export default function useRapidForm(): any {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: {},
    errors: {}
  })
  const validation = useValidation(dispatch)
  useDebugValue(state.data)
  return {
    handleSubmit: (c: any) => (e: any) => {
      e.preventDefault()
      return c(state.data, e)
    },
    data: state.data,
    errors: state.errors,
    validation
  }
}
