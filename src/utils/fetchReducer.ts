import { Reducer } from 'react'
import { ErrorsObj } from '../hooks/useRapidForm'

export interface State {
  data: object
  errors: ErrorsObj
  name?: string
}

export interface Action {
  type: 'change' | 'error' | 'reset'
  data?: object
  errors?: ErrorsObj
  name?: string | number
}

const fetchReducer: Reducer<State, Action> = (state, action) => {
  if (action.type === 'change') {
    if (action.name && state.errors?.hasOwnProperty(action.name)) {
      delete state.errors[action.name]
    }
    state = {
      ...state,
      data: {
        ...state.data,
        ...action.data
      },
      errors: {
        ...state.errors,
        ...action.errors
      }
    }
  }
  if (action.type === 'error') {
    state = {
      ...state,
      data: {
        ...state.data,
        ...action.data
      },
      errors: {
        ...state.errors,
        ...action.errors
      }
    }
  }
  if (action.type === 'reset') {
    state = {
      ...state,
      data: {},
      errors: {}
    }
  }
  return state
}

export default fetchReducer
