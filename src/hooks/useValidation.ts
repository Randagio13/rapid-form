import { useCallback, Dispatch } from 'react'
import handleChange, { GenericElement } from '../utils/handleChange'
import { Action } from '../utils/fetchReducer'
import setErrors from '../utils/setErrors'

export interface UseValidationInterface {
  (dispatch: Dispatch<Action>): void
}

const useValidation: UseValidationInterface = (dispatch) => {
  return useCallback(
    (ref): void => {
      if (ref) {
        const { name, value, checked, pattern, required, type } = ref
        dispatch({
          type: 'setRef',
          data: {
            [name]: ref,
          },
        })
        if (name) {
          setErrors(
            {
              checked,
              name,
              pattern,
              required,
              type,
              value,
            },
            dispatch
          )
        }
        ref.oninput = (e: GenericElement): any => handleChange(e, dispatch)
      }
    },
    [dispatch]
  )
}

export default useValidation
