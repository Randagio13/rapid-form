import { type Reducer } from 'react'

/**
 * Represents a value with a name and a corresponding string value.
 */
interface Value {
  name: string
  value: string
}

/**
 * Represents an error associated with a value.
 */
interface Error extends Value {
  isInvalid: boolean
  errorType?: 'required' | 'invalidFormat'
  message?: string
}

/**
 * Represents the state of the reducer.
 */
export interface State {
  values: Record<string, Value>
  errors: Record<string, Error>
}

/**
 * Represents the type of action that can be dispatched to the reducer.
 */
type ActionType = 'setValue' | 'setError' | 'reset'

/**
 * Represents an action that can be dispatched to the reducer.
 */
export interface Action extends State {
  type: ActionType
}

/**
 * Represents the initial state of the reducer.
 */
export const initialState: State = {
  values: {},
  errors: {}
}

/**
 * The reducer function that handles state updates based on dispatched actions.
 * @param state The current state.
 * @param action The action to be dispatched.
 * @returns The new state after applying the action.
 */
export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setValue':
    case 'setError':
      return { ...state, values: action.values, errors: action.errors }
    case 'reset':
      return { ...state, values: action.values, errors: {} }
  }
}

export default reducer
