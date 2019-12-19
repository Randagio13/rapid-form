import { useCallback } from 'react'
import handleChange from '../utils/handleChange'

export const useValidation = (dispatch: any) =>
  useCallback(
    (ref: any): void => {
      ref.oninput = (e: React.ChangeEvent<any>) => handleChange(e, dispatch)
    },
    [dispatch]
  )
