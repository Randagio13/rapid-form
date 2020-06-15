const DEFAULT_PATTERN = /\w+/
const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
const PW_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{10,}$/
// NOTE: At least one upper case English letter, (?=.*?[A-Z])
// NOTE: At least one lower case English letter, (?=.*?[a-z])
// NOTE: At least one digit, (?=.*?[0-9])
// NOTE: At least one special character, (?=.*?[#?!@$%^&*-])
// NOTE: Minimum ten in length .{10,} (with the anchors)

export type GenericValue = string | string[] | number | undefined | object

export interface GenericItem {
  value: GenericValue
  type: string
  checked?: boolean
}

export interface GenericItemAttribute extends GenericItem {
  name: string
  required: boolean
  value: string
  pattern?: GenericPattern
}

export interface IsEmpty {
  (object: GenericItem): boolean
}

export type GenericError = {
  error: boolean
  message: string
  code?: 'EMPTY_ERROR' | 'VALIDATION_ERROR'
}

export type GenericPattern = RegExp | string

export interface IsValidPattern {
  (value: string, type: string, pattern?: GenericPattern): GenericError
}

export interface ValidateValue {
  (data: GenericItemAttribute): GenericError
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
  const objError: GenericError = {
    error: true,
    message: `please enter a valid format`,
    code: 'VALIDATION_ERROR'
  }
  if (type === 'email' && !val.match(pattern || EMAIL_PATTERN)) {
    obj = { ...obj, ...objError }
  }
  if (type === 'password' && !val.match(pattern || PW_PATTERN)) {
    obj = { ...obj, ...objError }
  }
  if (type === 'text' && !val.match(pattern || DEFAULT_PATTERN)) {
    obj = { ...obj, ...objError }
  }
  return obj
}

const validateValue: ValidateValue = data => {
  if (!data.required) {
    return {
      error: false,
      message: ''
    }
  }
  if (isEmpty(data)) {
    return {
      error: true,
      message: `${data.name} is required`,
      code: 'EMPTY_ERROR'
    }
  }
  return isValidPattern(data.value, data.type, data.pattern)
}

export default validateValue
