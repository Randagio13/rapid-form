import { useCallback, useDebugValue, useReducer } from 'react'

const setErrors = (data: any, dispatch: any) => {
  console.log('data :', data)
  if (!data.value) {
    dispatch({
      type: 'empty',
      name: data.name,
      data: {
        [data.name]: {
          ...data
        }
      },
      errors: {
        [data.name]: {
          message: `${data.name} is required`
        }
      }
    })
  } else {
    console.log('data change :', data)
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

const fetchReducer = (state: any, action: any) => {
  if (action.type === 'change') {
    console.log('state, action :', action)
    if (state.errors.hasOwnProperty(action.name)) {
      console.log('k sto eliminando :', action.name)
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
  } else if (action.type === 'empty') {
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
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export const useValidation = (dispatch: any) =>
  useCallback(
    (ref: any): void => {
      ref.oninput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        const n = e.target.name
        const t = e.target.type
        const r = e.target.required
        const c = e.target.checked
        const data: any = {
          [n]: {
            value: v,
            name: n,
            type: t,
            required: r,
            checked: c
          }
        }
        setErrors(data[n], dispatch)
      }
    },
    [dispatch]
  )

export default function useRapidForm(): any {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: {},
    errors: {}
  })
  const validation = useValidation(dispatch)
  useDebugValue(state.data)
  return {
    data: state.data,
    errors: state.errors,
    validation
  }
}
