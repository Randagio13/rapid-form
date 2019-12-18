import validateValue from './validateValue'
const setErrors = (data: any, dispatch: any) => {
  const { error, message } = validateValue(data)
  if (error) {
    dispatch({
      type: 'error',
      name: data.name,
      data: {
        [data.name]: {
          ...data
        }
      },
      errors: {
        [data.name]: {
          message
        }
      }
    })
  } else {
    dispatch({
      type: 'change',
      name: data.name,
      data: {
        [data.name]: {
          ...data
        }
      }
    })
  }
}

export default setErrors
