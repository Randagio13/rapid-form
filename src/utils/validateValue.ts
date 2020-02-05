const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
const PW_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{10,}$/

export type GenericValue = string | string[] | number | undefined | object

export interface GenericItem {
  value: GenericValue
  type: string
  checked: boolean
}

export interface GenericItemAttribute extends GenericItem {
  name: string
  required: boolean
  value: string
  pattern: GenericPattern
}

export interface IsEmpty {
  (object: GenericItem): boolean
}

export type GenericPatternError = {
  error: boolean
  message: string
}

export type GenericPattern = RegExp | string

export interface IsValidPattern {
  (value: string, type: string, pattern: GenericPattern): GenericPatternError
}

export interface ValidateValue {
  (data: GenericItemAttribute): GenericPatternError
}

const isEmpty: IsEmpty = ({ value, type, checked }) => {
  if (type === ('checkbox' || 'radio')) {
    return !checked
  }
  if (Array.isArray(value)) {
    value = value.find(v => v !== '')?.length
  }
  return !value
}

const isValidPattern: IsValidPattern = (val, type, pattern) => {
  let obj = {
    error: false,
    message: ''
  }
  const objError = {
    error: true,
    message: `please enter a valid format`
  }
  if (type === 'email' && !val.match(pattern || EMAIL_PATTERN)) {
    obj = { ...obj, ...objError }
  }
  if (type === 'password' && !val.match(pattern || PW_PATTERN)) {
    obj = { ...obj, ...objError }
  }
  if (type === 'text' && !val.match(pattern)) {
    obj = { ...obj, ...objError }
  }
  return obj
}

const validateValue: ValidateValue = data => {
  if (isEmpty(data) && data.required) {
    return {
      error: true,
      message: `${data.name} is required`
    }
  }
  return isValidPattern(data.value, data.type, data.pattern)
}

export default validateValue
