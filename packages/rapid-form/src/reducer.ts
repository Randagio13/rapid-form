import { type Reducer } from 'react'

/**
 * Represents a value with a name and a corresponding string value.
 */
interface Value {
  name: string
  value: string
}

/**
 * Represents an error associated with a value.
 */
interface Error extends Value {
  isInvalid: boolean
  errorType?: 'required' | 'invalidFormat'
  message?: string
}

/**
 * Represents the state of the reducer.
 */
export interface State {
  values: Record<string, Value>
  errors: Record<string, Error>
  numberOfRequiredFields: number
}

/**
 * Represents the type of action that can be dispatched to the reducer.
 */
type ActionType = 'setValue' | 'setError' | 'reset'

/**
 * Represents an action that can be dispatched to the reducer.
 */
export interface Action extends State {
  type: ActionType
}

/**
 * Represents the initial state of the reducer.
 */
export const initialState: State = {
  values: {},
  errors: {},
  numberOfRequiredFields: 0
}

type AnyObject = { [key: string]: any };

function isObject(item: any): item is AnyObject {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge<T extends AnyObject, U extends AnyObject>(target: T, source: U): T & U {
  const output = { ...target } as T & U;

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const targetValue = output[key];
      const sourceValue = source[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        // Recursively merge nested objects
        output[key] = deepMerge(targetValue, sourceValue);
      } else {
        // Overwrite the target with the source value
        output[key as keyof U] = sourceValue as (T & U)[Extract<keyof U, string>];
      }
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
export const reducer: Reducer<State, Action> = (state, { type, ...data}) => {
  switch (type) {
    case 'setValue':
    case 'setError':
      return deepMerge(state, data)
    case 'reset':
      return { values: data.values, errors: {}, numberOfRequiredFields: data.numberOfRequiredFields }
  }
}

export default reducer
