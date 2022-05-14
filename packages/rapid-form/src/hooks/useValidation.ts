import { useCallback, Dispatch } from 'react'
import handleChange, { GenericElement } from '../utils/handleChange'
import { Action } from '../utils/fetchReducer'

export interface UseValidationInterface {
  (dispatch: Dispatch<Action>, event?: any): void
}

const useValidation: UseValidationInterface = (dispatch, event) => {
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
        switch (event) {
          case 'blur':
            ref.onblur = (e: GenericElement): any => handleChange(e, dispatch)
            break
          default:
            ref.oninput = (e: GenericElement): any => handleChange(e, dispatch)
            break
        }
      }
    },
    [dispatch]
  )
}

export default useValidation
