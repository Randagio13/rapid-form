import { describe, expect, test } from 'vitest';
import { yupResolver } from '../../src/resolvers/yup.js';

type YupError = {
  name: 'ValidationError';
  inner: YupError[];
  path?: string;
  message: string;
};

function makeYupError(fields: Record<string, string>): YupError {
  const inner = Object.entries(fields).map(([path, message]) => ({
    name: 'ValidationError' as const,
    inner: [],
    path,
    message
  }));
  return { name: 'ValidationError', inner, message: 'Validation failed' };
}

const mockYupSchema = {
  validate: async (data: unknown, _opts?: { abortEarly?: boolean }) => {
    const v = data as Record<string, string>;
    const errors: Record<string, string> = {};
    if (!v.email?.includes('@')) errors.email = 'Invalid email';
    if ((v.name ?? '').length < 3) errors.name = 'Min 3 chars';
    if (Object.keys(errors).length > 0) throw makeYupError(errors);
    return v;
  }
};

describe('yupResolver', () => {
  test('returns {} when all fields pass', async () => {
    const result = await yupResolver(mockYupSchema)({
      email: 'a@b.com',
      name: 'Alice'
    });
    expect(result).toEqual({});
  });

  test('maps inner errors to field errors', async () => {
    const result = await yupResolver(mockYupSchema)({
      email: 'bad',
      name: 'ab'
    });
    expect(result).toEqual({ email: 'Invalid email', name: 'Min 3 chars' });
  });

  test('handles single ValidationError with no inner array', async () => {
    const schema = {
      validate: async () => {
        throw {
          name: 'ValidationError',
          inner: [],
          path: 'email',
          message: 'Required'
        };
      }
    };
    const result = await yupResolver(schema)({});
    expect(result).toEqual({ email: 'Required' });
  });

  test('returns {} for non-ValidationError exceptions', async () => {
    const schema = {
      validate: async () => {
        throw new Error('Unexpected');
      }
    };
    const result = await yupResolver(schema)({});
    expect(result).toEqual({});
  });

  test('skips inner issues without a path', async () => {
    const schema = {
      validate: async () => {
        throw {
          name: 'ValidationError',
          inner: [
            {
              name: 'ValidationError',
              inner: [],
              path: undefined,
              message: 'No path'
            },
            {
              name: 'ValidationError',
              inner: [],
              path: 'email',
              message: 'With path'
            }
          ],
          message: 'fail'
        };
      }
    };
    const result = await yupResolver(schema)({});
    expect(result).toEqual({ email: 'With path' });
  });
});
