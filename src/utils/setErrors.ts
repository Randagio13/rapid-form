import validateValue from './validateValue'
import { Dispatch } from 'react'
import { Action } from './fetchReducer'

export interface SetErrors {
  (data: any, dispatch: Dispatch<Action>): void
}

const setErrors: SetErrors = (data, dispatch) => {
  const { error, message } = validateValue(data)
  if (error) {
    dispatch({
      type: 'error',
      name: data.name,
      data: {
        [data.name]: {
          ...data
        }
      },
      errors: {
        [data.name]: {
          message
        }
      }
    })
  } else {
    dispatch({
      type: 'change',
      name: data.name,
      data: {
        [data.name]: {
          ...data
        }
      }
    })
  }
}

export default setErrors
