import { SyntheticEvent, Dispatch } from 'react'
import { Action } from './fetchReducer'

export interface ResetFunc {
  (event: SyntheticEvent<HTMLFormElement>): void
}

export interface ResetAll {
  (dispacth: Dispatch<Action>): void
}

const resetAll: ResetAll = dispatch => {
  dispatch({
    type: 'reset'
  })
}

export default resetAll
