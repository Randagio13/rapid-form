const fetchReducer = (state: any, action: any) => {
  console.log('action :', action)
  if (action.type === 'change') {
    if (state.errors.hasOwnProperty(action.name)) {
      delete state.errors[action.name]
    }
    return {
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
  } else if (action.type === 'error') {
    return {
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
  } else if (action.type === 'reset') {
    return {
      ...state,
      data: {},
      errors: {}
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default fetchReducer
