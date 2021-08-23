import { useReducer, SyntheticEvent } from 'react'
import fetchReducer from '../utils/fetchReducer'
import useValidation from './useValidation'
import resetAll from '../utils/reset'
import { ResetFunc, resetSingleField } from '../utils/reset'
import useSubmitValidation from './useSubmitValidation '
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import handleChange, { GenericElement } from '../utils/handleChange'
import { State } from '../utils/fetchReducer'
import { GenericError } from '../utils/validateValue'
import setErrors from '../utils/setErrors'

export interface GeneralObject {
  [key: string]: string | string[] | Record<string, any>
}

export interface ErrorsObj {
  [key: string]: GenericError
}

export interface SubmitCallback<E = SyntheticEvent<HTMLFormElement>> {
  (data: Record<string, any>, errors: ErrorsObj, event: E): void
}

export interface HandleSubmit<C> {
  (callback: C): (event: SyntheticEvent<HTMLFormElement>) => void
}

export interface ReturnParams {
  handleSubmit: HandleSubmit<SubmitCallback>
  errors: ErrorsObj
  validation: any
  submitValidation: any
  reset: ResetFunc
  values: Record<string, any>
  setValue: (name: string, value: string) => void
  setError: (
    error: Pick<GenericError, 'code' | 'message'> & { name: string }
  ) => void
}

export interface UseRapidForm {
  (): ReturnParams
}

const useRapidForm: UseRapidForm = () => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: {},
    errors: {},
    refs: {},
  })
  const ValidationHook = useValidation(dispatch)
  const SubmitValidation = useSubmitValidation(dispatch)
  const reset: ResetFunc = (e, name) => {
    const target = e.currentTarget || (e.target as typeof e.currentTarget)
    if (name) {
      const field = target.elements.namedItem(name) as any
      if (field.type === 'checkbox' || field.type === 'radio')
        field.checked = false
      field.value = ''
      resetSingleField(dispatch, name)
    } else {
      target.reset()
    }

    resetAll(dispatch)
  }
  return {
    handleSubmit:
      (c) =>
      (e): void => {
        let tempState = {
          data: {},
          errors: {},
        }
        e.preventDefault()
        map(e.currentTarget.elements, (e: GenericElement) => {
          if (e.name) {
            const st = handleChange(e, dispatch) as State
            tempState = {
              data: { ...tempState.data, ...st.data },
              errors: { ...tempState.errors, ...st.errors },
            }
          }
        })
        const newState = {
          data: isEmpty(state.data) ? tempState.data : state.data,
          errors: isEmpty(state.errors) ? tempState.errors : state.errors,
        }
        return c(newState.data, newState.errors, e)
      },
    errors: state.errors,
    validation: ValidationHook,
    submitValidation: SubmitValidation,
    reset,
    values: state.data,
    setValue: (name: string, value: string) => {
      const field = state.refs[name]
      if (field) {
        field.value = value
        setErrors(
          {
            checked: field.checked,
            name,
            pattern: field.pattern,
            required: field.required,
            type: field.type,
            value,
          },
          dispatch
        )
      }
    },
    setError: (error) => {
      const { name, ...e } = error
      dispatch({
        type: 'error',
        name,
        errors: {
          [name]: {
            ...e,
            error: true,
          },
        },
      })
    },
  }
}

export default useRapidForm
