import { type Dispatch } from 'react'
import { type Action } from 'reducer.js'

type EventType = 'change' | 'blur' | 'input'

/**
 * Validation function
 * return true if the value is valid
 */
type ValidationFunction = (props: {
  value: string
  formElements: HTMLFormControlsCollection
}) => boolean

type ValidationConfig = Record<
  string,
  {
    validation: ValidationFunction
    eventType?: EventType
    message?: string
  }
>

export interface ValidationProps {
  /**
   * Reference to form element
   */
  ref: HTMLFormElement | null
  /**
   * Dispatch action to reducer
   */
  dispatch?: Dispatch<Action>
  /**
   * Configure event type for validation (change, blur, input)
   * @default { eventType: 'input', resetOnSubmit: true }
   */
  config?:
    | {
        eventType?: EventType
        validations?: ValidationConfig
        resetOnSubmit?: boolean
      }
    | undefined
}

/**
 * Validate email address using regex
 * @param email - The email address to validate
 * @returns True if the email address is valid, false otherwise
 */
function validateEmail(email: string): boolean {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

interface InputValidationProps {
  /**
   * Input type
   */
  type: HTMLInputElement['type']
  /**
   * Input value
   */
  value: string
  /**
   * Current element
   */
  element: HTMLInputElement
}

/**
 * Validate input value based on type
 * @param props - The input validation properties
 * @returns True if the input value is valid, false otherwise
 */
function inputValidation({ type, value, element }: InputValidationProps): boolean {
  switch (type) {
    case 'email':
      return validateEmail(value)
    case 'password':
      return value.length > 6
    case 'checkbox':
      return element.checked
    default:
      return value.length > 0
  }
}

/**
 * Perform validation on form elements
 * @param props - The validation properties
 */
export function validation({ ref, dispatch, config }: ValidationProps): void {
  const elements = ref?.elements
  let eventType = config?.eventType ?? 'input'
  const resetOnSubmit = config?.resetOnSubmit ?? true
  if (resetOnSubmit) {
    ref?.addEventListener('submit', function () {
      ref?.reset()
      dispatch?.({
        type: 'reset',
        values: {},
        errors: {}
      })
    })
  }
  if (elements != null) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      if (element != null) {
        const isRequired = element?.hasAttribute('required')
        if (isRequired) {
          const currentElementName = element.getAttribute('name') as string
          eventType =
            config?.validations?.[currentElementName]?.eventType ?? eventType
          element?.addEventListener(eventType, function (e) {
            const target = e.target as HTMLInputElement
            const val = target.value.trim()
            const isValid =
              config?.validations?.[target.name]?.validation != null
                ? config?.validations[target.name]?.validation({
                    value: val,
                    formElements: elements
                  })
                : inputValidation({
                    type: target.type,
                    value: val,
                    element: target
                  })
            if (isValid === true) {
              dispatch?.({
                type: 'setValue',
                values: { [target.name]: { name: target.name, value: val } },
                errors: {
                  [target.name]: {
                    name: target.name,
                    value: val,
                    isInvalid: false
                  }
                }
              })
            } else {
              dispatch?.({
                type: 'setError',
                values: { [target.name]: { name: target.name, value: val } },
                errors: {
                  [target.name]: {
                    name: target.name,
                    value: val,
                    isInvalid: true,
                    errorType: 'invalidFormat',
                    message:
                      config?.validations?.[target.name]?.message ??
                      'Invalid format or required field'
                  }
                }
              })
            }
          })
        }
      }
    }
  }
}
