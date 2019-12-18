const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
const PW_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{10,}$/

const isEmpty = ({ value, type, checked }: any) => {
  if (type === ('checkbox' || 'radio')) {
    return !checked
  }
  return !value
}

const isValidPattern = (
  val: string,
  type: string,
  pattern: RegExp | string
) => {
  const obj = {
    error: true,
    message: `please enter a valid format`
  }
  if (type === 'email' && !val.match(pattern || EMAIL_PATTERN)) {
    return obj
  }
  if (type === 'password' && !val.match(pattern || PW_PATTERN)) {
    return obj
  }
  if (type === 'text' && !val.match(pattern)) {
    return obj
  }
  return {
    error: false,
    message: ''
  }
}

const validateValue = (data: any) => {
  if (isEmpty(data) && data.required) {
    return {
      error: true,
      message: `${data.name} is required`
    }
  }
  return isValidPattern(data.value, data.type, data.pattern)
}

export default validateValue
