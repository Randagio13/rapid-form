import { useCallback, Dispatch } from 'react'
import handleChange, { GenericElement } from '../utils/handleChange'
import { Action } from '../utils/fetchReducer'

export interface UseValidationInterface {
  (dispatch: Dispatch<Action>): void
}

const useValidation: UseValidationInterface = (dispatch) => {
  return useCallback(
    (ref): void => {
      if (ref) {
        const { name, value } = ref
        dispatch({
          type: 'setRef',
          data: {
            [name]: ref,
          },
        })
        if (value) {
          handleChange(ref, dispatch)
        }
        ref.oninput = (e: GenericElement): any => handleChange(e, dispatch)
      }
    },
    [dispatch]
  )
}

export default useValidation
