import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { useRapidForm } from '../src/index.js';
import type { ValidationProps } from '../src/validation.js';

// ── helpers ──────────────────────────────────────────────────────────────────

/**
 * A form pairing a required field with optional ones, so a single render can
 * show that tracking and validation are independent.
 */
function MixedForm({ config }: { config?: ValidationProps['config'] }) {
  const { refValidation, errors, values, numberOfRequiredFields } =
    useRapidForm();
  return (
    <form
      ref={(ref) => {
        refValidation(ref, config);
      }}
    >
      <input
        type="text"
        name="required-field"
        data-testid="required-field"
        required
      />
      <input type="text" name="optional-field" data-testid="optional-field" />
      <input
        type="checkbox"
        name="optional-check"
        data-testid="optional-check"
      />
      <span data-testid="optional-value">
        {values['optional-field']?.value}
      </span>
      <span data-testid="optional-tracked">
        {values['optional-field'] ? 'yes' : 'no'}
      </span>
      <span data-testid="optional-invalid">
        {values['optional-field'] == null
          ? 'untracked'
          : String(errors['optional-field']?.isInvalid)}
      </span>
      <span data-testid="check-tracked">
        {values['optional-check'] ? 'yes' : 'no'}
      </span>
      <span data-testid="check-value">{values['optional-check']?.value}</span>
      <span data-testid="check-invalid">
        {String(errors['optional-check']?.isInvalid)}
      </span>
      <span data-testid="required-error">
        {errors['required-field']?.message}
      </span>
      <span data-testid="required-count">{numberOfRequiredFields}</span>
    </form>
  );
}

// ── specs ────────────────────────────────────────────────────────────────────

describe('trackUnvalidatedFields', () => {
  test('leaves unvalidated fields untracked by default', async () => {
    const user = userEvent.setup();
    render(<MixedForm />);
    await user.type(screen.getByTestId('optional-field'), 'hello');
    expect(screen.getByTestId('optional-tracked').textContent).toBe('no');
  });

  test('tracks unvalidated fields when enabled', async () => {
    const user = userEvent.setup();
    render(<MixedForm config={{ trackUnvalidatedFields: true }} />);
    await user.type(screen.getByTestId('optional-field'), 'hello');
    expect(screen.getByTestId('optional-tracked').textContent).toBe('yes');
    expect(screen.getByTestId('optional-value').textContent).toBe('hello');
  });

  test('imposes no constraint on tracked unvalidated fields', async () => {
    const user = userEvent.setup();
    render(<MixedForm config={{ trackUnvalidatedFields: true }} />);
    const optional = screen.getByTestId('optional-field');
    await user.type(optional, 'x');
    await user.clear(optional);
    // Empty would fail inputValidation's default rule — but this field has no rule.
    expect(screen.getByTestId('optional-tracked').textContent).toBe('yes');
    expect(screen.getByTestId('optional-invalid').textContent).toBe('false');
  });

  test('still validates required fields when tracking is enabled', async () => {
    const user = userEvent.setup();
    render(<MixedForm config={{ trackUnvalidatedFields: true }} />);
    const required = screen.getByTestId('required-field');
    await user.type(required, 'x');
    await user.clear(required);
    expect(screen.getByTestId('required-error').textContent).toBe(
      'Invalid format or required field'
    );
  });

  test('tracks optional checkboxes without requiring them to be checked', async () => {
    const user = userEvent.setup();
    render(<MixedForm config={{ trackUnvalidatedFields: true }} />);
    const check = screen.getByTestId('optional-check');
    await user.click(check);
    expect(screen.getByTestId('check-tracked').textContent).toBe('yes');
    expect(screen.getByTestId('check-value').textContent).toBe('true');
    // Unchecking must not mark it invalid — inputValidation's checkbox rule
    // would, but an unvalidated field never reaches it.
    await user.click(check);
    expect(screen.getByTestId('check-value').textContent).toBe('false');
    expect(screen.getByTestId('check-invalid').textContent).toBe('false');
  });

  test('does not count tracked optional fields as required', async () => {
    const user = userEvent.setup();
    render(<MixedForm config={{ trackUnvalidatedFields: true }} />);
    // Two optional fields are tracked, but only `required-field` is required.
    await user.type(screen.getByTestId('optional-field'), 'hello');
    expect(screen.getByTestId('required-count').textContent).toBe('1');
  });
});
