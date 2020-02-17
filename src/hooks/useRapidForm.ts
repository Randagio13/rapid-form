import { useReducer, SyntheticEvent, ChangeEvent } from 'react'
import fetchReducer from '../utils/fetchReducer'
import useValidation from './useValidation'
import resetAll from '../utils/reset'
import { ResetFunc } from '../utils/reset'
import useSubmitValidation from './useSubmitValidation '
import _ from 'lodash'
import handleChange, { GenericElement } from '../utils/handleChange'

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
    validation: any // TODO: Add type
    submitValidation: any // TODO: Add type
    reset: ResetFunc
  }
}

const useRapidForm: UseRapidForm = () => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: {},
    errors: {}
  })
  const ValidationHook = useValidation(dispatch)
  const SubmitValidation = useSubmitValidation(dispatch)
  const reset: ResetFunc = e => {
    e.currentTarget.reset()
    resetAll(dispatch)
  }
  return {
    handleSubmit: c => (e): void => {
      let tempState = {
        data: {},
        errors: {}
      }
      e.preventDefault()
      _.map(e.currentTarget.elements, (e: GenericElement) => {
        if (e.name) {
          const st = handleChange(e, dispatch)
          tempState = {
            // @ts-ignore
            data: { ...tempState.data, ...st.data },
            // @ts-ignore
            errors: { ...tempState.errors, ...st.errors }
          }
        }
      })
      const newState = {
        data: _.isEmpty(state.data) ? tempState.data : state.data,
        errors: _.isEmpty(state.errors) ? tempState.errors : state.errors
      }
      return c(newState.data, newState.errors, e)
    },
    errors: state.errors,
    validation: ValidationHook,
    submitValidation: SubmitValidation,
    reset
  }
}

export default useRapidForm
