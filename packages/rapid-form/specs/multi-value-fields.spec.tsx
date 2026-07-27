import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { useRapidForm } from '../src/index.js';
import type { ValidationProps } from '../src/validation.js';

// ── helpers ──────────────────────────────────────────────────────────────────

function MultiSelectForm({ config }: { config?: ValidationProps['config'] }) {
  const { refValidation, values, errors } = useRapidForm();
  const v = values.langs?.value;
  return (
    <form
      ref={(ref) => {
        refValidation(ref, config);
      }}
    >
      <select multiple title="langs" name="langs" data-testid="langs" required>
        <option value="ts">TS</option>
        <option value="js">JS</option>
        <option value="go">Go</option>
      </select>
      <span data-testid="kind">{Array.isArray(v) ? 'array' : typeof v}</span>
      <span data-testid="json">{JSON.stringify(v ?? null)}</span>
      <span data-testid="invalid">{String(errors.langs?.isInvalid)}</span>
      <button data-testid="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

/** A single-value select, to prove the widening didn't leak into the common case. */
function SingleSelectForm() {
  const { refValidation, values } = useRapidForm();
  const v = values.lang?.value;
  return (
    <form
      ref={(ref) => {
        refValidation(ref, { resetOnSubmit: false });
      }}
    >
      <select title="lang" name="lang" data-testid="lang" required>
        <option value="">Pick one</option>
        <option value="ts">TS</option>
        <option value="go">Go</option>
      </select>
      <span data-testid="kind">{Array.isArray(v) ? 'array' : typeof v}</span>
      <span data-testid="value">{String(v)}</span>
    </form>
  );
}

// ── specs ────────────────────────────────────────────────────────────────────

describe('<select multiple>', () => {
  test('captures every selected option, not just the first', async () => {
    const user = userEvent.setup();
    render(<MultiSelectForm config={{ resetOnSubmit: false }} />);
    await user.selectOptions(screen.getByTestId('langs'), ['ts', 'go']);
    expect(screen.getByTestId('kind').textContent).toBe('array');
    expect(screen.getByTestId('json').textContent).toBe('["ts","go"]');
  });

  test('reports an empty list when nothing is selected', async () => {
    const user = userEvent.setup();
    render(<MultiSelectForm config={{ resetOnSubmit: false }} />);
    const select = screen.getByTestId('langs');
    await user.selectOptions(select, ['ts']);
    await user.deselectOptions(select, ['ts']);
    expect(screen.getByTestId('json').textContent).toBe('[]');
  });

  test('a required multi-select is invalid only when empty', async () => {
    const user = userEvent.setup();
    render(<MultiSelectForm config={{ resetOnSubmit: false }} />);
    const select = screen.getByTestId('langs');
    await user.selectOptions(select, ['ts']);
    expect(screen.getByTestId('invalid').textContent).toBe('false');
    await user.deselectOptions(select, ['ts']);
    expect(screen.getByTestId('invalid').textContent).toBe('true');
  });

  test('a resolver receives the full list', async () => {
    const user = userEvent.setup();
    const seen: Record<string, string | string[]>[] = [];
    render(
      <MultiSelectForm
        config={{
          resetOnSubmit: false,
          resolver: (values) => {
            seen.push({ ...values });
            return {};
          }
        }}
      />
    );
    await user.selectOptions(screen.getByTestId('langs'), ['ts', 'go']);
    expect(seen.at(-1)?.langs).toEqual(['ts', 'go']);
  });

  test('a custom validation receives the full list', async () => {
    const user = userEvent.setup();
    const seen: (string | string[])[] = [];
    render(
      <MultiSelectForm
        config={{
          resetOnSubmit: false,
          validations: {
            langs: {
              validation: ({ value }) => {
                seen.push(value);
                return Array.isArray(value) && value.length >= 2;
              },
              message: 'Pick at least two'
            }
          }
        }}
      />
    );
    await user.selectOptions(screen.getByTestId('langs'), ['ts']);
    expect(screen.getByTestId('invalid').textContent).toBe('true');
    await user.selectOptions(screen.getByTestId('langs'), ['ts', 'go']);
    expect(screen.getByTestId('invalid').textContent).toBe('false');
    expect(seen.at(-1)).toEqual(['ts', 'go']);
  });

  test('resets to an empty list, not an empty string', async () => {
    const user = userEvent.setup();
    render(<MultiSelectForm />);
    await user.selectOptions(screen.getByTestId('langs'), ['ts', 'go']);
    await user.click(screen.getByTestId('submit-button'));
    // resetOnSubmit defaults to true, so state is cleared on submit.
    expect(screen.getByTestId('kind').textContent).toBe('array');
    expect(screen.getByTestId('json').textContent).toBe('[]');
  });
});

describe('single-value fields are unaffected', () => {
  test('a non-multiple select still reports a string', async () => {
    const user = userEvent.setup();
    render(<SingleSelectForm />);
    await user.selectOptions(screen.getByTestId('lang'), 'ts');
    expect(screen.getByTestId('kind').textContent).toBe('string');
    expect(screen.getByTestId('value').textContent).toBe('ts');
  });
});
