import { SyntheticEvent, Dispatch } from 'react'
import { Action } from './fetchReducer'

export interface ResetFunc {
  (event: SyntheticEvent<HTMLFormElement>, name?: string): void
}

export interface ResetAll {
  (dispacth: Dispatch<Action>): void
}

export interface ResetSingleField {
  (dispacth: Dispatch<Action>, name: string): void
}

const resetAll: ResetAll = (dispatch) => {
  dispatch({
    type: 'reset',
  })
}

export const resetSingleField: ResetSingleField = (dispatch, name) => {
  dispatch({
    type: 'resetField',
    data: {
      [name]: {
        value: '',
      },
    },
    errors: {
      [name]: {
        error: false,
        message: '',
      },
    },
  })
}

export default resetAll
