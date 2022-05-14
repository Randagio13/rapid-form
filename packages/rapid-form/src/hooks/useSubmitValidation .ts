import { Dispatch, useCallback } from 'react'
import { Action } from '../utils/fetchReducer'
import handleChange, { GenericElement } from '../utils/handleChange'

export interface SubmitValidation {
  (dispatch: Dispatch<Action>): void
}

const useSubmitValidation: SubmitValidation = (dispatch) => {
  return useCallback(
    (ref): void => {
      if (ref) {
        ref.onsubmit = (e: any): void => {
          e.currentTarget.elements.forEach((e: GenericElement) => {
            if (e.currentTarget?.name) {
              handleChange(e, dispatch)
            }
          })
        }
      }
    },
    [dispatch]
  )
}

export default useSubmitValidation
