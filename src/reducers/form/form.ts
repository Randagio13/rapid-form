import { List } from 'immutable'
import { Action } from 'types'
export interface IFormInitialState {
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
    fields: List(fields),
    type: SET_FIELDS
  }
}

export default function form (state = initialState, action = Action) {
  const { type, fields } = action
  switch (type) {
    case SET_FIELDS:
      return {...state, fields}
    default:
      return state
  }
}
