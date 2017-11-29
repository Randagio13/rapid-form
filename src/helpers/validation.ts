import { fromJS, List, Map } from 'immutable'
import * as React from 'react'

/**
 * analizeFields
 * @param formFields any[]
 * @param removeError any
 * @param value string
 */
export const analizeFields = (formFields: any[], removeError?: any, value = '') => {
  return formFields.map((cmps: any): any => {
    const type = cmps.get('type')
    const key = cmps.get('key')
    const propsCmps = cmps.get('props').toJS()
    const { children, ...propsCmp } = propsCmps
    if (children) {
      const { props } = children
      if (Array.isArray(children)) {
        // TODO: You must complete this part
        return null
      }
      const nwProps = {...props, error: !removeError, value}
      return fromJS(
        React.createElement(type, {...propsCmp, key}, React.cloneElement(
          children, nwProps
        ))
      )
    }
    const p = {...propsCmp, error: !removeError}
    return fromJS(
      React.createElement(type, {...p, key, value})
    )
  })
}

export const analizeErrors = (formid: string, key: number, name: string, errors: any, typeError: any) => {
  debugger
  const e = errors.get(formid)
  if (typeError.size > 0) {
    return errors.setIn([formid, key], fromJS({name, ...typeError.toJS()})).filter((v: any) => v !== undefined)
  }
  if (e && e.size > 0 && e.getIn([`${key}`, 'name']) === name) {
    return errors.size === 1 ? errors.delete(0) : errors.delete(key)
  }
  return errors
}

/**
 * @param method string
 * @retutn any
 */
const validationMethod = (method: string, val: any): any => {
  let r = Map()
  const explodeMethod = method.split(',')
  explodeMethod.map((m) => {
    switch (m) {
      case 'empty':
      default:
        if (val === '' || val === undefined) {
          r = r.set(m, true)
        }
        break
    }
  })
  return r
}
export default validationMethod
