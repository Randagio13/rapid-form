import type { Reducer } from 'react';

/**
 * Represents a value with a name and a corresponding string value.
 */
interface Value {
  name: string;
  value: string;
}

/**
 * Represents an error associated with a value.
 */
interface Error extends Value {
  isInvalid: boolean;
  errorType?: 'invalidFormat';
  message?: string;
}

/**
 * Represents the state of the reducer.
 */
export interface State {
  values: Record<string, Value>;
  errors: Record<string, Error>;
  numberOfRequiredFields: number;
}

type BaseAction = State & { type: 'setValue' | 'setError' | 'reset' };
type RemoveFieldAction = {
  type: 'removeField';
  name: string;
  numberOfRequiredFields: number;
};

/**
 * Represents an action that can be dispatched to the reducer.
 */
export type Action = BaseAction | RemoveFieldAction;

/**
 * Represents the initial state of the reducer.
 */
export const initialState: State = {
  values: {},
  errors: {},
  numberOfRequiredFields: 0
};

// biome-ignore lint/suspicious/noExplicitAny: required for recursive deep merge
type AnyObject = { [key: string]: any };

// biome-ignore lint/suspicious/noExplicitAny: required for recursive deep merge
function isObject(item: any): item is AnyObject {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge<T extends AnyObject, U extends AnyObject>(
  target: T,
  source: U
): T & U {
  const output = { ...target } as T & U;

  for (const [key, sourceValue] of Object.entries(source)) {
    const targetValue = output[key];

    if (isObject(sourceValue) && isObject(targetValue)) {
      (output as AnyObject)[key] = deepMerge(targetValue, sourceValue);
    } else {
      output[key as keyof U] = sourceValue as (T & U)[Extract<keyof U, string>];
    }
  }

  return output;
}
/**
 * The reducer function that handles state updates based on dispatched actions.
 * @param state The current state.
 * @param action The action to be dispatched.
 * @returns The new state after applying the action.
 */
export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setValue':
    case 'setError': {
      const { type: _, ...data } = action;
      return deepMerge(state, data);
    }
    case 'reset':
      return {
        values: action.values,
        errors: {},
        numberOfRequiredFields: action.numberOfRequiredFields
      };
    case 'removeField': {
      const { [action.name]: _v, ...values } = state.values;
      const { [action.name]: _e, ...errors } = state.errors;
      return {
        ...state,
        values,
        errors,
        numberOfRequiredFields: action.numberOfRequiredFields
      };
    }
  }
};

export default reducer;
