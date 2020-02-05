import setErrors from './setErrors'
import multiSelectValues from './multiSelect'
import { Dispatch, ChangeEvent } from 'react'
import { Action } from './fetchReducer'
import { GenericItemAttribute } from './validateValue'

export interface GenericElement {
  multiple?: boolean
  options: HTMLOptionsCollection
  dataset?: {
    typevalue?: 'array' | 'string'
  }
  name: string
  value: string
  type: string
  required?: boolean
  checked?: boolean
  pattern?: string
}

export interface HandleChange {
  (event: ChangeEvent<GenericElement>, dispatch: Dispatch<Action>): void
}

const handleChange: HandleChange = (e, dispatch) => {
  const m = e.currentTarget.multiple
  const v = m
    ? multiSelectValues(
        e.currentTarget?.options,
        e.currentTarget?.dataset?.typevalue
      )
    : e.currentTarget.value
  const n = e.currentTarget.name
  const t = e.currentTarget.type
  const r = e.currentTarget?.required
  const c = e.currentTarget?.checked
  const p = e.currentTarget?.pattern
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
