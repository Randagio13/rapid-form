import { Reducer } from 'react'
import { ErrorsObj } from '../hooks/useRapidForm'

export interface State {
  data: Record<string, any>
  errors: ErrorsObj
  refs: Record<string, any>
  name?: string
}

export interface Action {
  type: 'change' | 'error' | 'reset' | 'setRef' | 'resetField'
  data?: Record<string, any>
  errors?: ErrorsObj
  name?: string | number
}

// TODO: refactor in one way
const fetchReducer: Reducer<State, Action> = (state, action) => {
  if (action.type === 'change') {
    if (action.name && state.errors?.hasOwnProperty(action.name)) {
      delete state.errors[action.name]
    }
    state = {
      ...state,
      data: {
        ...state.data,
        ...action.data,
      },
      errors: {
        ...state.errors,
        ...action.errors,
      },
    }
  }
  if (action.type === 'setRef') {
    state = {
      ...state,
      refs: {
        ...state.refs,
        ...action.data,
      },
    }
  }
  if (action.type === 'error' || action.type === 'resetField') {
    state = {
      ...state,
      data: {
        ...state.data,
        ...action.data,
      },
      errors: {
        ...state.errors,
        ...action.errors,
      },
    }
  }
  if (action.type === 'reset') {
    state = {
      ...state,
      data: {},
      errors: {},
    }
  }
  return state
}

export default fetchReducer
