import { SyntheticEvent, Dispatch } from 'react'
import { Action } from './fetchReducer'
import handleChange, { GenericElement } from './handleChange'

export interface ResetFunc {
  (event: SyntheticEvent<HTMLFormElement>, name?: string): void
}

export interface ResetAll {
  (dispacth: Dispatch<Action>): void
}

export interface ResetSingleField {
  (field: GenericElement, dispacth: Dispatch<Action>): void
}

const resetAll: ResetAll = (dispatch) => {
  dispatch({
    type: 'reset',
  })
}

export const resetSingleField: ResetSingleField = (field, dispatch) => {
  return handleChange(field, dispatch)
}

export default resetAll
