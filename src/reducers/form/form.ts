import { inputTypes } from 'constants'
import { analizeErrors, analizeFields, validationMethod } from 'helpers'
import { fromJS, List, Map } from 'immutable'
import { Action } from 'types'

interface IFormInitialState {
  errors: any,
  fields: any,
  theme: string
}

const initialState: IFormInitialState = {
  errors: List(),
  fields: Map(),
  theme: ''
}

const SET_FIELDS = 'SET_FIELDS'
const SET_THEME = 'SET_THEME'
const SET_ERRORS = 'SET_ERRORS'
const SET_CHECK_ERROR = 'SET_CHECK_ERROR'

export const setFields = (fields: any[], id: string): object => {
  const fs = Map().set(id, fromJS(fields))
  return {
    fields: fs,
    id,
    type: SET_FIELDS
  }
}

export const setTheme = (theme: string): object => {
  return {
    theme,
    type: SET_THEME
  }
}

export const checkAllReqFields = (id: string) => {
  return (dispatch: any, getState: any) => {
    const { form: { fields } } = getState()
    fields.get(id).map((cmps: any): void => {
      debugger
      const key = cmps.get('key')
      const propsCmps = cmps.get('props').toJS()
      const { children } = propsCmps
      if (children) {
        if (Array.isArray(children)) {
          // TODO: You must complete this part
          return null
        }
        const propsChild = Reflect.get(children, 'props')
        const { value: valChild, type: typeChild, required: reqChild } = propsChild
        if (!inputTypes.find((i: any) => i === typeChild) || !reqChild) {
          return null
        }
        dispatch(
          setCheckError(propsChild, key, validationMethod('', valChild))
        )
      }
      const { value, type, required } = propsCmps
      if (!inputTypes.find((i: any) => i === type) || !required) {
        return null
      }
      dispatch(
        setCheckError(propsCmps, key, validationMethod('', value))
      )
    })
  }
}

export const setCheckError = (field: any, key: any, typeError: any): object => {
  return (dispatch: any, getState: any): any => {
    const errors = getState().form.errors
    const { name, value } = field
    debugger
    dispatch({
      errors: analizeErrors(key, name, errors, typeError),
      type: SET_ERRORS
    })
    const fields = getState().form.fields
    const formFields = fields.filter((i: any) => i.get('key') === key)
    const cmp = analizeFields(formFields, typeError.size === 0, value)
    const newField = formFields.merge(cmp)
    const newFields = fields.update(key, () => fromJS(newField.toJS()[0]))
    return dispatch({
      fields: newFields,
      type: SET_CHECK_ERROR
    })
  }
}

export default function form (state = initialState, action = Action): any {
  const { type, fields, theme, errors, id } = action
  switch (type) {
    case SET_FIELDS:
    case SET_CHECK_ERROR:
      const fs = state.fields.set(id, fields)
      return fields ? {...state, fields: fs} : state
    case SET_ERRORS:
      return {...state, errors}
    case SET_THEME:
      return {...state, theme}
    default:
      return state
  }
}
