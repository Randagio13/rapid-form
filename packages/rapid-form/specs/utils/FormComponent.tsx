import { useRapidForm } from '../../src/index.js';
import type { ValidationProps } from '../../src/validation.js';

export interface ElementType {
  as: 'input' | 'select' | 'textarea';
  name: string;
  type?: JSX.IntrinsicElements['input']['type'] | undefined;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface FormProps {
  elements: ElementType[];
  config?: ValidationProps['config'];
}

export function Form({ elements, config }: FormProps): JSX.Element {
  const { refValidation, errors } = useRapidForm();
  const components = elements.map((element) => {
    switch (element.as) {
      case 'textarea':
        return (
          <div key={element.name}>
            <textarea
              name={element.name}
              data-testid={element.name}
              required={element.required}
            />
            <span data-testid={`${element.name}-error`}>
              {errors[element.name]?.message}
            </span>
          </div>
        );
      case 'select':
        return (
          <div key={element.name}>
            <select
              title={element.name}
              name={element.name}
              data-testid={element.name}
              required={element.required}
            >
              {element.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span data-testid={`${element.name}-error`}>
              {errors[element.name]?.message}
            </span>
          </div>
        );
      default:
        return (
          <div key={element.name}>
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
        );
    }
  });
  return (
    <form
      ref={(ref) => {
        refValidation(ref, config);
      }}
    >
      {components}
      <button data-testid="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}
