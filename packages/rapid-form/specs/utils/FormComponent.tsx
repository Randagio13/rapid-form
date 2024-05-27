import { useRapidForm } from 'index'
import { type ValidationProps } from 'validation'

export interface ElementType {
  as: 'input' | 'select' | 'textarea'
  name: string
  type?: JSX.IntrinsicElements['input']['type'] | undefined
  required?: boolean
  options?: { label: string, value: string }[]
}

interface FormProps {
  elements: ElementType[]
  config?: ValidationProps['config']
}

export function Form({ elements, config }: FormProps): JSX.Element {
  const { refValidation, errors } = useRapidForm()
  const components = elements.map((element, key) => {
    switch (element.as) {
      case 'input':
        return (
          <div key={key}>
            <input
              name={element.name}
              type={element.type}
              data-testid={element.name}
              required={element.required}
            />
            <span data-testid={`${element.name}-error`}>
              {errors[element.name]?.message}
            </span>
          </div>
        )
      case 'textarea':
        return (
          <div key={key}>
            <textarea
              name={element.name}
              data-testid={element.name}
              required={element.required}
            />
            <span data-testid={`${element.name}-error`}>
              {errors[element.name]?.message}
            </span>
          </div>
        )
      case 'select':
        return (
          <div key={key}>
            <select
              title={element.name}
              name={element.name}
              data-testid={element.name}
              required={element.required}
            >
              {element.options?.map((option, key) => (
                <option key={key} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span data-testid={`${element.name}-error`}>
              {errors[element.name]?.message}
            </span>
          </div>
        )
      default:
        return null
    }
  })
  return (
    <form
      ref={(ref) => {
        refValidation(ref, config)
      }}
    >
      {components}
    </form>
  )
}
