import type { Dispatch } from 'react';
import {
  addTrackedEventListener,
  disconnectObserver,
  getRegisteredNames,
  hasEventListener,
  registerFieldName,
  setObserver
} from './events.js';
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
  ref: HTMLFormElement;
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
      // Use native browser validation — no custom regex, no ReDoS risk.
      return element.validity.valid;
    case 'password':
      return value.length > 6;
    case 'checkbox':
      return element.checked;
    default:
      return value.length > 0;
  }
}

const UNSAFE_FIELD_NAMES = new Set(['__proto__', 'constructor', 'prototype']);

/** Collect all named field values from a form's element collection. */
function collectFormValues(
  elements: HTMLFormControlsCollection
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const el of Array.from(elements)) {
    const name = el.getAttribute('name');
    if (!name || UNSAFE_FIELD_NAMES.has(name)) continue;
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
  const elements = ref.elements;
  const eventType = config?.eventType ?? 'input';
  const resetOnSubmit = config?.resetOnSubmit ?? true;
  const resolver = config?.resolver;

  const countRequired = (): number =>
    Array.from(elements).filter((e) => e?.hasAttribute('required')).length;

  // Sync cleanup: dispatch removeField for names that were registered but are no longer in the DOM.
  // This runs on every re-render (React calls the ref callback each render), so it reliably
  // catches fields removed by React state changes.
  const currentNames = new Set<string>();
  for (const el of Array.from(elements)) {
    const n = el.getAttribute('name');
    if (n) currentNames.add(n);
  }
  for (const name of getRegisteredNames(ref)) {
    if (!currentNames.has(name)) {
      dispatch?.({
        type: 'removeField',
        name,
        numberOfRequiredFields: countRequired()
      });
      getRegisteredNames(ref).delete(name);
    }
  }

  // Submit listener
  const needsSubmitListener = resolver != null || resetOnSubmit;
  if (needsSubmitListener && !hasEventListener(ref, 'submit')) {
    addTrackedEventListener(ref, 'submit', (e) => {
      const numberOfRequiredFields = countRequired();
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

  // Field event listeners. Idempotent (guarded by hasEventListener), so it can
  // run both on every validation() call and from the MutationObserver when
  // fields mount after the initial render. Returns how many fields got wired.
  const attachFieldListeners = (): number => {
    let wired = 0;
    for (const element of Array.from(elements)) {
      const name = element.getAttribute('name');
      if (!name) continue;

      if (resolver) {
        // Resolver mode: attach to every named field; run the full resolver.
        const elementEventType =
          config?.validations?.[name]?.eventType ?? eventType;
        if (hasEventListener(element, elementEventType)) continue;
        registerFieldName(ref, name);
        wired++;
        addTrackedEventListener(element, elementEventType, () => {
          void dispatchResolverResults(
            resolver,
            elements,
            dispatch,
            countRequired()
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
        registerFieldName(ref, name);
        wired++;
        addTrackedEventListener(element, elementEventType, (e) => {
          const target = e.target as HTMLInputElement;
          const val = target.value.trim();
          const numberOfRequiredFields = countRequired();
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
    return wired;
  };
  attachFieldListeners();

  // MutationObserver — safety net for DOM changes that happen without the form
  // component re-rendering: fields removed outside React (vanilla JS DOM
  // manipulation) AND fields mounted by descendant-only renders (e.g. a child
  // component that returns null until an async fetch settles). React-driven
  // changes that re-render the form are already handled synchronously above,
  // since React re-invokes the ref callback on each render.
  // Disconnect any previous observer before creating a new one so observers
  // don't accumulate across re-renders.
  disconnectObserver(ref);
  const observer = new MutationObserver(() => {
    // Wire any fields that mounted since the last validation() run.
    const wired = attachFieldListeners();
    const names = new Set<string>();
    for (const el of Array.from(elements)) {
      const n = el.getAttribute('name');
      if (n) names.add(n);
    }
    for (const name of getRegisteredNames(ref)) {
      if (!names.has(name)) {
        dispatch?.({
          type: 'removeField',
          name,
          numberOfRequiredFields: countRequired()
        });
        getRegisteredNames(ref).delete(name);
      }
    }
    if (wired > 0) {
      // Fields appeared without a form re-render: sync numberOfRequiredFields
      // so consumers relying on it see the late-mounted fields.
      dispatch?.({
        type: 'setValue',
        values: {},
        errors: {},
        numberOfRequiredFields: countRequired()
      });
    }
  });
  observer.observe(ref, { childList: true, subtree: true });
  setObserver(ref, observer);
}
