import { fromJS, List, Map } from 'immutable'
import * as React from 'react'

/**
 * @param formFields any[]
 */
export const analizeFields = (formFields: any[], removeError?: any) => {
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
      const nwProps = {...props, error: !removeError}
      return fromJS(
        React.createElement(type, {...propsCmp, key}, React.cloneElement(
          children, nwProps
        ))
      )
    }
    const p = {...propsCmp, error: !removeError}
    return fromJS(
      React.createElement(type, {...p, key})
    )
  })
}

export const analizeErrors = (key: number, name: string, errors: any, typeError: any) => {
  if (typeError.size > 0) {
    return errors.set(key, {name, ...typeError.toJS()}).filter((v: any) => v !== undefined)
  }
  if (errors.get(key) || errors.size > 0 && Reflect.get(errors.get(0), 'name') === name) {
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
        if (val === '') {
          r = r.set(m, true)
        }
        break
    }
  })
  return r
}
export default validationMethod
