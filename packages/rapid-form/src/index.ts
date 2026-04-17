import { useReducer, useRef } from 'react';
import { disconnectObserver } from './events.js';
import reducer, { initialState, type State } from './reducer.js';
import {
  type SchemaResolver,
  type ValidationProps,
  validation
} from './validation.js';

export type { SchemaResolver };
export type Config = ValidationProps['config'];
export type Value = State['values'][string];
export type FieldError = State['errors'][string];
export type NumberOfRequiredFields = State['numberOfRequiredFields'];

/**
 * Rapid form hook
 */
export function useRapidForm(): {
  refValidation: (
    ref: HTMLFormElement | null,
    config?: ValidationProps['config']
  ) => void;
  values: State['values'];
  errors: State['errors'];
  numberOfRequiredFields: State['numberOfRequiredFields'];
} {
  const [state, dispatch] = useReducer(reducer, initialState);
  const formRef = useRef<HTMLFormElement | null>(null);
  return {
    refValidation: (ref, config) => {
      if (ref === null && formRef.current !== null) {
        disconnectObserver(formRef.current);
        formRef.current = null;
        return;
      }
      formRef.current = ref;
      validation({ ref, dispatch, config });
    },
    ...state
  };
}
