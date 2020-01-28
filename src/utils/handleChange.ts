import setErrors from './setErrors'
import multiSelectValues from './multiSelect'
import { Dispatch, ChangeEvent } from 'react'
import { ActionInterface } from './fetchReducer'

export interface handleChangeInterface {
  (event: ChangeEvent<any>, dispatch: Dispatch<ActionInterface>): void
}

const handleChange: handleChangeInterface = (e, dispatch) => {
  const m = e.target.multiple
  const v = m
    ? multiSelectValues(e.target?.options, e.target.dataset?.typevalue)
    : e.target?.value
  const n = e.target.name
  const t = e.target.type
  const r = e.target.required
  const c = e.target?.checked
  const p = e.target?.pattern
  const data = {
    [n]: {
      value: v,
      name: n,
      type: t,
      required: r,
      checked: c,
      pattern: p
    }
  }
  setErrors(data[n], dispatch)
}

export default handleChange
