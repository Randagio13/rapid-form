import { SyntheticEvent, Dispatch } from 'react'
import { ActionInterface } from './fetchReducer'

export interface resetInterface {
  (event: SyntheticEvent<HTMLFormElement>): void
}

export interface resetAllInterface {
  (dispacth: Dispatch<ActionInterface>): void
}

const resetAll: resetAllInterface = dispatch => {
  dispatch({
    type: 'reset'
  })
}

export default resetAll
