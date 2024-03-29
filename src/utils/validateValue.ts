const DEFAULT_PATTERN = /\w+/
// https://html.spec.whatwg.org/#valid-e-mail-address
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const PW_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
// const PW_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{10,}$/
// NOTE: At least one lower case English letter, (?=.*?[a-z])
// NOTE: At least one upper case English letter, (?=.*?[A-Z])
// NOTE: At least one digit, (?=.*\d)
// NOTE: At least one special character, (?=.*?[#?!@$%^&*-]) (Removed)
// NOTE: Minimum ten in length .{6,} (with the anchors)

export type GenericValue =
  | string
  | string[]
  | number
  | undefined
  | Record<string, any>

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
    value = value.find((v) => v !== '')?.length
  }
  return !value
}

const isValidPattern: IsValidPattern = (val, type, pattern) => {
  let obj = {
    error: false,
    message: '',
  }
  const objError: GenericError = {
    error: true,
    message: `please enter a valid format`,
    code: 'VALIDATION_ERROR',
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

const validateValue: ValidateValue = (data) => {
  if (!data.required) {
    return {
      error: false,
      message: '',
    }
  }
  if (isEmpty(data)) {
    return {
      error: true,
      message: `${data.name} is required`,
      code: 'EMPTY_ERROR',
    }
  }
  return isValidPattern(data.value, data.type, data.pattern)
}

export default validateValue
