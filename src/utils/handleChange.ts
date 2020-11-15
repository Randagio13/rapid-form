import setErrors from './setErrors'
import multiSelectValues from './multiSelect'
import { Dispatch } from 'react'
import { Action, State } from './fetchReducer'
import { GenericItemAttribute } from './validateValue'

export interface GenericEventTarget {
  currentTarget?: {
    multiple?: boolean
    options: HTMLOptionsCollection
    dataset?: {
      typevalue?: 'array' | 'string'
    }
    name: string
    value: string
    type: string
    required: boolean
    checked?: boolean
    pattern?: string
  }
}

export interface GenericElement extends GenericEventTarget {
  multiple?: boolean
  options: HTMLOptionsCollection
  dataset?: {
    typevalue?: 'array' | 'string'
  }
  name: string
  value: string
  type: string
  required: boolean
  checked?: boolean
  pattern?: string
}

export interface FormData {
  [key: string]: GenericItemAttribute
}

export interface HandleChange {
  (event: GenericElement, dispatch: Dispatch<Action>): void | State
}

const handleChange: HandleChange = (e, dispatch) => {
  const element = e?.currentTarget ? e.currentTarget : e
  const m = element.multiple
  const v = m ? multiSelectValues(element?.options) : element.value
  const n = element.name
  const t = element.type
  const r = element.required
  const c = element?.checked
  const p = element?.pattern
  const data = {
    [n]: {
      value: v,
      name: n,
      type: t,
      required: r,
      checked: c,
      pattern: p,
    },
  }
  return setErrors(data[n], dispatch)
}

export default handleChange
