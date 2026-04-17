import type { SchemaResolver } from '../index.js';

interface YupValidationError {
  name: 'ValidationError';
  inner: YupValidationError[];
  path?: string;
  message: string;
}

/**
 * Minimal interface satisfied by any Yup object schema.
 */
export interface YupSchema {
  validate(
    value: unknown,
    options?: { abortEarly?: boolean }
  ): Promise<unknown>;
}

function isYupValidationError(err: unknown): err is YupValidationError {
  return (
    typeof err === 'object' &&
    err !== null &&
    (err as YupValidationError).name === 'ValidationError'
  );
}

/**
 * Adapter that converts a Yup schema into a rapid-form `SchemaResolver`.
 *
 * @example
 * ```ts
 * import * as yup from 'yup';
 * import { yupResolver } from 'rapid-form/resolvers/yup';
 *
 * const schema = yup.object({
 *   email: yup.string().email('Invalid email').required(),
 *   name:  yup.string().min(3, 'At least 3 characters').required(),
 * });
 *
 * const { refValidation, errors } = useRapidForm();
 * refValidation(ref, { resolver: yupResolver(schema) });
 * ```
 */
export function yupResolver(schema: YupSchema): SchemaResolver {
  return async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      if (!isYupValidationError(err)) return {};
      const errors: Record<string, string> = {};
      const issues = err.inner.length > 0 ? err.inner : [err];
      for (const issue of issues) {
        if (issue.path) errors[issue.path] = issue.message;
      }
      return errors;
    }
  };
}
