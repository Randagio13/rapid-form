import { Dispatch, useCallback } from 'react'
import { Action } from '../utils/fetchReducer'
import _ from 'lodash'
import handleChange, { GenericElement } from '../utils/handleChange'

export interface SubmitValidation {
  (dispatch: Dispatch<Action>): void
}

const useSubmitValidation: SubmitValidation = (dispatch) => {
  return useCallback(
    (ref): void => {
      if (ref) {
        ref.onsubmit = (e: HTMLFormElement): void => {
          _.map(e['currentTarget'].elements, (e: GenericElement) => {
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
