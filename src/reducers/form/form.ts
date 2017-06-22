import { Action } from 'types'
export interface IFormInitialState {
  errors: any[],
  fields: any[]
}

const initialState: IFormInitialState = {
  errors: [],
  fields: []
}
export function form (state = initialState, action = Action): any {
  return state
}
