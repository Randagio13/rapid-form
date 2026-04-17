import type { Dispatch } from 'react';
import { addTrackedEventListener, hasEventListener } from './events.js';
import type { Action, State } from './reducer.js';

type EventType = 'change' | 'blur' | 'input';

/**
 * Validation function — return true if the value is valid.
 */
type ValidationFunction = (props: {
  value: string;
  formElements: HTMLFormControlsCollection;
}) => boolean;

type ValidationConfig = Record<
  string,
  {
    validation: ValidationFunction;
    eventType?: EventType;
    message?: string;
  }
>;

/**
 * Schema resolver function.
 * Receives all current form values and returns a map of field names to error
 * messages. Return undefined (or omit the key) for fields that are valid.
 * Both sync and async resolvers are supported.
 */
export type SchemaResolver = (
  values: Record<string, string>
) =>
  | Record<string, string | undefined>
  | Promise<Record<string, string | undefined>>;

export interface ValidationProps {
  /**
   * Reference to form element
   */
  ref: HTMLFormElement | null;
  /**
   * Dispatch action to reducer
   */
  dispatch?: Dispatch<Action>;
  /**
   * Configure event type for validation (change, blur, input)
   * @default { eventType: 'input', resetOnSubmit: true }
   */
  config?:
    | {
        eventType?: EventType;
        validations?: ValidationConfig;
        resetOnSubmit?: boolean;
        /**
         * Schema resolver for library-agnostic schema validation (Zod, Yup…).
         * When provided it replaces per-field `validations`.
         */
        resolver?: SchemaResolver;
      }
    | undefined;
}

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

interface InputValidationProps {
  type: HTMLInputElement['type'];
  value: string;
  element: HTMLInputElement;
}

function inputValidation({
  type,
  value,
  element
}: InputValidationProps): boolean {
  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return value.length > 6;
    case 'checkbox':
      return element.checked;
    default:
      return value.length > 0;
  }
}

/** Collect all named field values from a form's element collection. */
function collectFormValues(
  elements: HTMLFormControlsCollection
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const el of Array.from(elements)) {
    const name = el.getAttribute('name');
    if (!name) continue;
    const input = el as HTMLInputElement;
    values[name] =
      input.type === 'checkbox' ? String(input.checked) : input.value.trim();
  }
  return values;
}

/**
 * Run the resolver, dispatch errors for every field, and return whether all
 * fields passed validation.
 */
async function dispatchResolverResults(
  resolver: SchemaResolver,
  elements: HTMLFormControlsCollection,
  dispatch: Dispatch<Action> | undefined,
  numberOfRequiredFields: number
): Promise<boolean> {
  const formValues = collectFormValues(elements);
  const resolverErrors = await Promise.resolve(resolver(formValues));
  const newErrors: State['errors'] = {};
  const newValues: State['values'] = {};
  for (const [name, value] of Object.entries(formValues)) {
    newValues[name] = { name, value };
    const msg = resolverErrors[name];
    newErrors[name] = {
      name,
      value,
      isInvalid: msg != null,
      ...(msg != null
        ? { errorType: 'invalidFormat' as const, message: msg }
        : { message: '' })
    };
  }
  dispatch?.({
    type: 'setError',
    values: newValues,
    errors: newErrors,
    numberOfRequiredFields
  });
  return Object.values(resolverErrors).every((v) => v == null);
}

function resetForm(
  ref: HTMLFormElement,
  elements: HTMLFormControlsCollection,
  dispatch: Dispatch<Action> | undefined,
  numberOfRequiredFields: number
): void {
  ref.reset();
  const resetValues: State['values'] = {};
  for (const element of Array.from(elements)) {
    const name = element.getAttribute('name');
    if (name != null) resetValues[name] = { value: '', name };
  }
  dispatch?.({
    type: 'reset',
    values: resetValues,
    errors: {},
    numberOfRequiredFields
  });
}

export function validation({ ref, dispatch, config }: ValidationProps): void {
  const elements = ref?.elements;
  const eventType = config?.eventType ?? 'input';
  const resetOnSubmit = config?.resetOnSubmit ?? true;
  const resolver = config?.resolver;
  if (ref == null || elements == null) return;

  const numberOfRequiredFields = Array.from(elements).filter((e) =>
    e?.hasAttribute('required')
  ).length;

  // Submit listener
  const needsSubmitListener = resolver != null || resetOnSubmit;
  if (needsSubmitListener && !hasEventListener(ref, 'submit')) {
    addTrackedEventListener(ref, 'submit', (e) => {
      if (resolver) {
        e.preventDefault();
        void dispatchResolverResults(
          resolver,
          elements,
          dispatch,
          numberOfRequiredFields
        ).then((isValid) => {
          if (isValid && resetOnSubmit) {
            resetForm(ref, elements, dispatch, numberOfRequiredFields);
          }
        });
      } else {
        resetForm(ref, elements, dispatch, numberOfRequiredFields);
      }
    });
  }

  // Field event listeners
  for (const element of Array.from(elements)) {
    const name = element.getAttribute('name');
    if (!name) continue;

    if (resolver) {
      // Resolver mode: attach to every named field; run the full resolver.
      const elementEventType =
        config?.validations?.[name]?.eventType ?? eventType;
      if (hasEventListener(element, elementEventType)) continue;
      addTrackedEventListener(element, elementEventType, () => {
        void dispatchResolverResults(
          resolver,
          elements,
          dispatch,
          numberOfRequiredFields
        );
      });
    } else {
      // Per-field mode: only attach to required / custom-validated fields.
      const isRequired = element.hasAttribute('required');
      const hasCustomValidation = config?.validations?.[name] != null;
      if (!isRequired && !hasCustomValidation) continue;
      const elementEventType =
        config?.validations?.[name]?.eventType ?? eventType;
      if (hasEventListener(element, elementEventType)) continue;
      addTrackedEventListener(element, elementEventType, (e) => {
        const target = e.target as HTMLInputElement;
        const val = target.value.trim();
        const isValid =
          config?.validations?.[target.name]?.validation != null
            ? config.validations[target.name]?.validation({
                value: val,
                formElements: elements
              })
            : inputValidation({
                type: target.type,
                value: val,
                element: target
              });
        if (isValid === false) {
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
            },
            numberOfRequiredFields
          });
        } else {
          dispatch?.({
            type: 'setValue',
            values: { [target.name]: { name: target.name, value: val } },
            errors: {
              [target.name]: {
                name: target.name,
                value: val,
                isInvalid: false,
                message: ''
              }
            },
            numberOfRequiredFields
          });
        }
      });
    }
  }
}
