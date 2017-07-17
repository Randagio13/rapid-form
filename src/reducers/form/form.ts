import { fromJS, List } from 'immutable'
import { Action } from 'types'
interface IFormInitialState {
  errors: any[],
  fields: any
}

const initialState: IFormInitialState = {
  errors: [],
  fields: List()
}

const SET_FIELDS = 'SET_FIELDS'

export const setFields = (fields: any[]): object => {
  return {
    fields: fromJS(fields),
    type: SET_FIELDS
  }
}

export default function form (state = initialState, action = Action): any {
  const { type, fields } = action
  switch (type) {
    case SET_FIELDS:
      return {...state, fields}
    default:
      return state
  }
}
