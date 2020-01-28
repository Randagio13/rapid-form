import { useCallback, Dispatch } from 'react'
import handleChange from '../utils/handleChange'
import { ActionInterface } from '../utils/fetchReducer'

export interface useValidationInterface {
  (dispatch: Dispatch<ActionInterface>): null
}

const useValidation: useValidationInterface = dispatch => {
  useCallback(
    (ref: any): void => {
      ref.oninput = (e: React.ChangeEvent<any>) => handleChange(e, dispatch)
    },
    [dispatch]
  )
  return null
}

export default useValidation
