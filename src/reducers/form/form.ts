import { analizeErrors, analizeFields } from 'helpers'
import { fromJS, List } from 'immutable'
import { Action } from 'types'

interface IFormInitialState {
  errors: any,
  fields: any,
  theme: string
}

const initialState: IFormInitialState = {
  errors: List(),
  fields: List(),
  theme: ''
}

const SET_FIELDS = 'SET_FIELDS'
const SET_THEME = 'SET_THEME'
const SET_ERRORS = 'SET_ERRORS'
const SET_CHECK_ERROR = 'SET_CHECK_ERROR'

export const setFields = (fields: any[]): object => {
  return {
    fields: fromJS(fields),
    type: SET_FIELDS
  }
}

export const setTheme = (theme: string): object => {
  return {
    theme,
    type: SET_THEME
  }
}

export const setCheckError = (field: any, key: any, typeError: any): object => {
  return (dispatch: any, getState: any): any => {
    const errors = getState().form.errors
    const { name } = field
    dispatch({
      errors: analizeErrors(key, name, errors, typeError),
      type: SET_ERRORS
    })
    const fields = getState().form.fields
    const formFields = fields.filter((i: any) => i.get('key') === key)
    const cmp = analizeFields(formFields, typeError.size === 0)
    const newField = formFields.merge(cmp)
    const newFields = fields.update(key, () => fromJS(newField.toJS()[0]))
    return dispatch({
      fields: newFields,
      type: SET_CHECK_ERROR
    })
  }
}

export default function form (state = initialState, action = Action): any {
  const { type, fields, theme, errors } = action
  switch (type) {
    case SET_FIELDS:
    case SET_CHECK_ERROR:
      return fields ? {...state, fields} : state
    case SET_ERRORS:
      return {...state, errors}
    case SET_THEME:
      return {...state, theme}
    default:
      return state
  }
}
