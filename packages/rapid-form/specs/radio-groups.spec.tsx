import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { useRapidForm } from '../src/index.js';
import type { ValidationProps } from '../src/validation.js';

// ── helpers ──────────────────────────────────────────────────────────────────

/**
 * A three-member radio group plus a text field. The text field gives resolver
 * mode something to fire on without touching the radios, which is how the
 * "nothing selected" case gets observed.
 */
function RadioForm({ config }: { config?: ValidationProps['config'] }) {
  const { refValidation, values, numberOfRequiredFields } = useRapidForm();
  return (
    <form
      ref={(ref) => {
        refValidation(ref, config);
      }}
    >
      <input
        type="radio"
        name="plan"
        value="free"
        data-testid="free"
        required
      />
      <input type="radio" name="plan" value="pro" data-testid="pro" required />
      <input type="radio" name="plan" value="max" data-testid="max" required />
      <input type="text" name="note" data-testid="note" required />
      <span data-testid="plan-value">{values.plan?.value ?? 'UNSET'}</span>
      <span data-testid="required-count">{numberOfRequiredFields}</span>
    </form>
  );
}

// ── specs ────────────────────────────────────────────────────────────────────

describe('radio group values', () => {
  test('per-field mode reports the selected member', async () => {
    const user = userEvent.setup();
    render(<RadioForm config={{ resetOnSubmit: false }} />);
    await user.click(screen.getByTestId('pro'));
    expect(screen.getByTestId('plan-value').textContent).toBe('pro');
  });

  test('per-field mode follows a changed selection', async () => {
    const user = userEvent.setup();
    render(<RadioForm config={{ resetOnSubmit: false }} />);
    await user.click(screen.getByTestId('pro'));
    await user.click(screen.getByTestId('free'));
    expect(screen.getByTestId('plan-value').textContent).toBe('free');
  });

  test('resolver mode reports the selected member, not the last in DOM order', async () => {
    const user = userEvent.setup();
    const seen: Record<string, string>[] = [];
    render(
      <RadioForm
        config={{
          resetOnSubmit: false,
          resolver: (values) => {
            seen.push({ ...values });
            return {};
          }
        }}
      />
    );
    // `max` is last in DOM order and would previously have won regardless.
    await user.click(screen.getByTestId('pro'));
    expect(seen.at(-1)?.plan).toBe('pro');
  });

  test('an unselected group reports an empty string', async () => {
    const user = userEvent.setup();
    const seen: Record<string, string>[] = [];
    render(
      <RadioForm
        config={{
          resetOnSubmit: false,
          resolver: (values) => {
            seen.push({ ...values });
            return {};
          }
        }}
      />
    );
    // Type in the text field so the resolver runs without touching the radios.
    await user.type(screen.getByTestId('note'), 'x');
    expect(seen.at(-1)?.plan).toBe('');
  });
});

describe('numberOfRequiredFields with radio groups', () => {
  test('counts a radio group as one field', async () => {
    const user = userEvent.setup();
    render(<RadioForm config={{ resetOnSubmit: false }} />);
    await user.click(screen.getByTestId('pro'));
    // Three required radios + one required text input = 2 logical fields.
    expect(screen.getByTestId('required-count').textContent).toBe('2');
  });

  test('ignores required elements that have no name', async () => {
    const user = userEvent.setup();
    function UnnamedForm() {
      const { refValidation, numberOfRequiredFields } = useRapidForm();
      return (
        <form
          ref={(ref) => {
            refValidation(ref, { resetOnSubmit: false });
          }}
        >
          <input type="text" name="named" data-testid="named" required />
          {/* Untracked by rapid-form, so it must not inflate the count. */}
          <input type="text" data-testid="unnamed" required />
          <span data-testid="count">{numberOfRequiredFields}</span>
        </form>
      );
    }
    render(<UnnamedForm />);
    await user.type(screen.getByTestId('named'), 'x');
    expect(screen.getByTestId('count').textContent).toBe('1');
  });
});
