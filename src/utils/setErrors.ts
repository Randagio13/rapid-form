import validateValue from './validateValue'
import { Dispatch } from 'react'
import { Action } from './fetchReducer'
import { GenericItemAttribute } from './validateValue'
import { ErrorsObj } from '../hooks/useRapidForm'

export interface SetErrors {
  (data: GenericItemAttribute, dispatch: Dispatch<Action>): void
}

const setErrors: SetErrors = (data, dispatch) => {
  const { error, message, code } = validateValue(data)
  if (error) {
    dispatch({
      type: 'error',
      name: data.name,
      data: {
        [data.name]: {
          ...data,
        },
      },
      errors: {
        [data.name]: {
          error,
          message,
          code,
        },
      } as ErrorsObj,
    })
    return {
      data: {
        [data.name]: {
          ...data,
        },
      },
      errors: {
        [data.name]: {
          message,
          code,
        },
      },
    }
  }
  dispatch({
    type: 'change',
    name: data.name,
    data: {
      [data.name]: {
        ...data,
      },
    },
  })
  return {
    data: {
      [data.name]: {
        ...data,
      },
    },
  }
}

export default setErrors
