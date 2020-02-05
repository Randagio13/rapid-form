import { useReducer, SyntheticEvent, ChangeEvent } from 'react'
import fetchReducer from '../utils/fetchReducer'
import useValidation from './useValidation'
import resetAll from '../utils/reset'
import { ResetFunc } from '../utils/reset'

export interface GeneralObject {
  [key: string]: string | string[] | object
}

export interface ErrorsObj {
  [key: string]: {
    error?: boolean
    message: string
  }
}

export interface SubmitCallback<E = SyntheticEvent<HTMLFormElement>> {
  (data: object, errors: ErrorsObj, event: E): void
}

export interface HandleSubmit<C> {
  (callback: C): (event: SyntheticEvent<HTMLFormElement>) => void
}

export interface UseRapidForm {
  (): {
    handleSubmit: HandleSubmit<SubmitCallback>
    errors: ErrorsObj
    validation: any
    reset: ResetFunc
  }
}

const useRapidForm: UseRapidForm = () => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: {},
    errors: {}
  })
  const ValidationHook = useValidation(dispatch)
  const reset: ResetFunc = e => {
    e.currentTarget.reset()
    resetAll(dispatch)
  }
  return {
    handleSubmit: c => (e): void => {
      e.preventDefault()
      return c(state.data, state.errors, e)
    },
    errors: state.errors,
    validation: ValidationHook,
    reset
  }
}

export default useRapidForm
