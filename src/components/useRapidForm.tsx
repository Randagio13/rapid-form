import { useCallback, useDebugValue, useReducer } from 'react'

const setErrors = (data: any, dispatch: any) => {
  if (!data.value) {
    dispatch({
      type: 'empty',
      data: {
        [data.name]: {
          message: `${data.name} is required`
        }
      }
    })
  }
}

const fetchReducer = (state: any, action: any) => {
  console.log('state fetch :', state)
  if (action.type === 'change') {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.data
      }
    }
  } else if (action.type === 'empty') {
    return {
      ...state,
      errors: {
        ...action.data
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
    data: null,
    errors: null
  })
  const validation = useValidation(dispatch)
  useDebugValue(state.data)
  return {
    data: state.data,
    errors: state.errors,
    validation
  }
}
