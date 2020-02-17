import validateValue from './validateValue'
import { Dispatch } from 'react'
import { Action } from './fetchReducer'
import { GenericItemAttribute } from './validateValue'

export interface SetErrors {
  (data: GenericItemAttribute, dispatch: Dispatch<Action>): void
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
    return {
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
    }
  }
  dispatch({
    type: 'change',
    name: data.name,
    data: {
      [data.name]: {
        ...data
      }
    }
  })
  return {
    data: {
      [data.name]: {
        ...data
      }
    }
  }
}

export default setErrors
