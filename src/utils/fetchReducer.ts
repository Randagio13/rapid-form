export interface StateInterface {
  [key: string]: any
}

export interface ActionInterface {
  type: 'change' | 'error' | 'reset'
  data?: object
  errors?: object
  name?: string
}

const fetchReducer = (state: StateInterface, action: ActionInterface) => {
  if (action.type === 'change') {
    if (state.errors.hasOwnProperty(action.name) && action.name) {
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
