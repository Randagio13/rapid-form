import { Action } from 'types'
interface InitialState {
  errors: any[]
}

const initialState: InitialState = {
  errors: []
}
export function form (state = initialState, action = Action): any {
  return state
}
