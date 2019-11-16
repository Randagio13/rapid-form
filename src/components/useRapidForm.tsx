import { useCallback, useDebugValue, useReducer } from 'react'

const setErrors = (data: any, dispatch: any) => {
  if (!data.value) {
    dispatch({
      type: 'empty',
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
    dispatch({
      type: 'change',
      data: {
        [data.name]: {
          ...data
        }
      }
    })
  }
}

const fetchReducer = (state: any, action: any) => {
  console.log('state fetch :', state)
  if (action.type === 'change') {
    Object.keys(state.errors).map((k: any) => {
      if (state.data.hasOwnProperty(k)) {
        delete state.errors[k]
      }
    })
    return {
      ...state,
      data: {
        ...state.data,
        ...action.data
      },
      errors: {
        ...state.errors
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
    (ref: any) => {
      ref.oninput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        const n = e.target.name
        const t = e.target.type
        const r = e.target.required
        const data: any = {
          [n]: {
            value: v,
            name: n,
            type: t,
            required: r
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
