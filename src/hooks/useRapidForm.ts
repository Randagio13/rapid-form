import { useReducer, SyntheticEvent, Ref } from 'react'
import fetchReducer from '../utils/fetchReducer'
import useValidation from './useValidation'
import resetAll from '../utils/reset'
import { resetInterface } from '../utils/reset'

export interface GeneralObject {
  [key: string]: any
}

export interface SubmitCallback {
  (data: object, errors: object, event: SyntheticEvent<HTMLFormElement>): void
}

export interface useRapidFormInterface {
  (): {
    handleSubmit: (
      c: SubmitCallback
    ) => (e: SyntheticEvent<HTMLFormElement>) => void
    errors: GeneralObject
    validation: Ref<any>
    reset: resetInterface
  }
}

const useRapidForm: useRapidFormInterface = () => {
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
    handleSubmit: c => e => {
      e.preventDefault()
      return c(state.data, state.errors, e)
    },
    errors: state.errors,
    validation,
    reset
  }
}

export default useRapidForm
