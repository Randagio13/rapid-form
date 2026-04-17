import { describe, expect, test } from 'vitest';
import { zodResolver } from '../../src/resolvers/zod.js';

const mockZodSchema = {
  safeParseAsync: async (data: unknown) => {
    const v = data as Record<string, string>;
    const errors: { path: string[]; message: string }[] = [];
    if (!v.email?.includes('@'))
      errors.push({ path: ['email'], message: 'Invalid email' });
    if ((v.name ?? '').length < 3)
      errors.push({ path: ['name'], message: 'Min 3 chars' });
    return errors.length > 0
      ? { success: false as const, error: { errors } }
      : { success: true as const };
  }
};

describe('zodResolver', () => {
  test('returns {} when all fields pass', async () => {
    const result = await zodResolver(mockZodSchema)({
      email: 'a@b.com',
      name: 'Alice'
    });
    expect(result).toEqual({});
  });

  test('maps issues to field errors', async () => {
    const result = await zodResolver(mockZodSchema)({
      email: 'bad',
      name: 'ab'
    });
    expect(result).toEqual({ email: 'Invalid email', name: 'Min 3 chars' });
  });

  test('ignores issues with empty path (root errors)', async () => {
    const schema = {
      safeParseAsync: async () => ({
        success: false as const,
        error: {
          errors: [
            { path: [] as string[], message: 'Root error' },
            { path: ['email'], message: 'Field error' }
          ]
        }
      })
    };
    const result = await zodResolver(schema)({ email: 'bad' });
    expect(result).toEqual({ email: 'Field error' });
  });
});
