import type { SchemaResolver } from '../index.js';

interface ZodIssue {
  path: (string | number)[];
  message: string;
}

interface ZodError {
  errors: ZodIssue[];
}

interface ZodSafeParseSuccess {
  success: true;
}

interface ZodSafeParseError {
  success: false;
  error: ZodError;
}

type ZodSafeParseResult = ZodSafeParseSuccess | ZodSafeParseError;

/**
 * Minimal interface satisfied by any Zod schema object.
 * Accepts both `z.object(…)` and any other Zod schema that implements
 * `safeParseAsync`.
 */
export interface ZodSchema {
  safeParseAsync(data: unknown): Promise<ZodSafeParseResult>;
}

/**
 * Adapter that converts a Zod schema into a rapid-form `SchemaResolver`.
 *
 * @example
 * ```ts
 * import { z } from 'zod';
 * import { zodResolver } from 'rapid-form/resolvers/zod';
 *
 * const schema = z.object({
 *   email: z.string().email('Invalid email'),
 *   name:  z.string().min(3, 'At least 3 characters'),
 * });
 *
 * const { refValidation, errors } = useRapidForm();
 * refValidation(ref, { resolver: zodResolver(schema) });
 * ```
 */
export function zodResolver(schema: ZodSchema): SchemaResolver {
  return async (values) => {
    const result = await schema.safeParseAsync(values);
    if (result.success) return {};
    return Object.fromEntries(
      result.error.errors
        .filter((issue) => issue.path.length > 0)
        .map((issue) => [String(issue.path[0]), issue.message])
    );
  };
}
