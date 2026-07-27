import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { useRapidForm } from '../src/index.js';
import type { ValidationProps } from '../src/validation.js';

// ── helpers ──────────────────────────────────────────────────────────────────

function CheckboxForm({ config }: { config?: ValidationProps['config'] }) {
  const { refValidation, values, errors } = useRapidForm();
  return (
    <form
      ref={(ref) => {
        refValidation(ref, config);
      }}
    >
      <input type="checkbox" name="terms" data-testid="terms" required />
      <span data-testid="terms-value">{values.terms?.value}</span>
      <span data-testid="terms-invalid">{String(errors.terms?.isInvalid)}</span>
      <button data-testid="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

/** A checkbox carrying an explicit `value` attribute, the other `'on'` source. */
function ValuedCheckboxForm() {
  const { refValidation, values } = useRapidForm();
  return (
    <form
      ref={(ref) => {
        refValidation(ref);
      }}
    >
      <input
        type="checkbox"
        name="plan"
        value="premium"
        data-testid="plan"
        required
      />
      <span data-testid="plan-value">{values.plan?.value}</span>
    </form>
  );
}

// ── specs ────────────────────────────────────────────────────────────────────

describe('checkbox values in per-field mode', () => {
  test('reports checked state rather than the value attribute', async () => {
    const user = userEvent.setup();
    render(<CheckboxForm config={{ resetOnSubmit: false }} />);
    const terms = screen.getByTestId('terms');
    await user.click(terms);
    expect(screen.getByTestId('terms-value').textContent).toBe('true');
    await user.click(terms);
    expect(screen.getByTestId('terms-value').textContent).toBe('false');
  });

  test('ignores an explicit value attribute', async () => {
    const user = userEvent.setup();
    render(<ValuedCheckboxForm />);
    await user.click(screen.getByTestId('plan'));
    expect(screen.getByTestId('plan-value').textContent).toBe('true');
  });

  test('still validates a required checkbox by its checked state', async () => {
    const user = userEvent.setup();
    render(<CheckboxForm config={{ resetOnSubmit: false }} />);
    const terms = screen.getByTestId('terms');
    await user.click(terms);
    expect(screen.getByTestId('terms-invalid').textContent).toBe('false');
    await user.click(terms);
    expect(screen.getByTestId('terms-invalid').textContent).toBe('true');
  });

  test('passes the checked state to a custom validation function', async () => {
    const user = userEvent.setup();
    const seen: string[] = [];
    render(
      <CheckboxForm
        config={{
          resetOnSubmit: false,
          validations: {
            terms: {
              validation: ({ value }) => {
                // A checkbox is single-valued; narrow before string use.
                if (typeof value !== 'string') return false;
                seen.push(value);
                return value === 'true';
              },
              message: 'You must accept the terms'
            }
          }
        }}
      />
    );
    const terms = screen.getByTestId('terms');
    await user.click(terms);
    await user.click(terms);
    expect(seen).toEqual(['true', 'false']);
  });
});
