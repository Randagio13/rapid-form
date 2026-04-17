import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { describe, expect, test } from 'vitest';
import { useRapidForm } from '../src/index.js';

// ── helpers ──────────────────────────────────────────────────────────────────

function ConditionalForm() {
  const [showExtra, setShowExtra] = useState(false);
  const { refValidation, errors, values } = useRapidForm();
  return (
    <form ref={(ref) => refValidation(ref)}>
      <input
        type="checkbox"
        name="agree"
        data-testid="agree"
        required
        onChange={(e) => setShowExtra(e.target.checked)}
      />
      {showExtra && (
        <input type="text" name="extra" data-testid="extra" required />
      )}
      <span data-testid="extra-error">{errors.extra?.message}</span>
      <span data-testid="agree-tracked">{values.agree ? 'yes' : 'no'}</span>
      <button data-testid="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

function FieldArrayForm() {
  const [rows, setRows] = useState([{ id: 1 }]);
  const { refValidation, errors } = useRapidForm();
  return (
    <form ref={(ref) => refValidation(ref)}>
      {rows.map((row, i) => (
        <div key={row.id}>
          <input
            type="email"
            name={`email.${i}`}
            data-testid={`email.${i}`}
            required
          />
          <span data-testid={`email.${i}-error`}>
            {errors[`email.${i}`]?.message}
          </span>
          <button
            type="button"
            data-testid={`remove-${i}`}
            onClick={() => setRows((s) => s.filter((r) => r.id !== row.id))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="add-row"
        onClick={() => setRows((s) => [...s, { id: Date.now() }])}
      >
        Add
      </button>
      <button data-testid="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

function UnmountForm({ onUnmount }: { onUnmount?: () => void }) {
  const { refValidation } = useRapidForm();
  return (
    <form
      ref={(ref) => {
        refValidation(ref);
        if (!ref) onUnmount?.();
      }}
    >
      <input type="text" name="name" data-testid="name" required />
      <button type="submit">Submit</button>
    </form>
  );
}

function SimpleForm() {
  const { refValidation, errors } = useRapidForm();
  return (
    <form data-testid="form" ref={(ref) => refValidation(ref)}>
      <input type="text" name="name" data-testid="name" required />
      <input type="email" name="email" data-testid="email" required />
      <span data-testid="name-error">{errors.name?.message}</span>
      {/* nameless button — covers if(n) false branch in MO callback */}
      <button type="submit">Submit</button>
    </form>
  );
}

function NullBeforeMountForm() {
  const { refValidation } = useRapidForm();
  useEffect(() => {
    // Call refValidation(null) when formRef.current is still null —
    // covers the !element early-return branch in disconnectObserver.
    refValidation(null);
  }, [refValidation]);
  return null;
}

// ── tests ────────────────────────────────────────────────────────────────────

describe('Dynamic fields', () => {
  test('conditional field — added after mount is validated', async () => {
    const user = userEvent.setup();
    render(<ConditionalForm />);

    // extra field not in DOM yet — checking agree reveals it
    await user.click(screen.getByTestId('agree'));
    const extraInput = await screen.findByTestId('extra');

    // type in the newly added field — it must be tracked
    await user.type(extraInput, 'a');
    await user.clear(extraInput);

    await waitFor(() =>
      expect(screen.getByTestId('extra-error').textContent).not.toBe('')
    );
  });

  test('conditional field — removed from DOM cleans up from errors', async () => {
    const user = userEvent.setup();
    render(<ConditionalForm />);

    // show extra field and trigger an error
    await user.click(screen.getByTestId('agree'));
    const extraInput = await screen.findByTestId('extra');
    await user.type(extraInput, 'hello');
    await user.clear(extraInput);

    await waitFor(() =>
      expect(screen.getByTestId('extra-error').textContent).not.toBe('')
    );

    // uncheck → extra field removed from DOM
    await user.click(screen.getByTestId('agree'));
    expect(screen.queryByTestId('extra')).toBeNull();

    // error span should now be empty (field removed from state)
    await waitFor(() =>
      expect(screen.getByTestId('extra-error').textContent).toBe('')
    );
  });

  test('field array — added row is validated independently', async () => {
    const user = userEvent.setup();
    render(<FieldArrayForm />);

    // add a second row
    await user.click(screen.getByTestId('add-row'));

    const secondInput = await screen.findByTestId('email.1');

    // type an invalid email in the second row
    await user.type(secondInput, 'notanemail');

    await waitFor(() =>
      expect(screen.getByTestId('email.1-error').textContent).not.toBe('')
    );
  });

  test('field array — removed row is cleaned up from state', async () => {
    const user = userEvent.setup();
    render(<FieldArrayForm />);

    // add a second row and trigger validation on it
    await user.click(screen.getByTestId('add-row'));
    const secondInput = await screen.findByTestId('email.1');
    await user.type(secondInput, 'bad');

    await waitFor(() =>
      expect(screen.getByTestId('email.1-error').textContent).not.toBe('')
    );

    // remove the second row
    await user.click(screen.getByTestId('remove-1'));
    expect(screen.queryByTestId('email.1')).toBeNull();
  });

  test('observer disconnects cleanly on unmount', async () => {
    let unmounted = false;
    const { unmount } = render(
      <UnmountForm
        onUnmount={() => {
          unmounted = true;
        }}
      />
    );
    unmount();
    expect(unmounted).toBe(true);
    // No assertion beyond "no error thrown" — verifies cleanup path runs safely
  });

  test('refValidation(null) is safe when no form was ever mounted', () => {
    expect(() => render(<NullBeforeMountForm />)).not.toThrow();
  });

  test('MutationObserver cleans up field removed via direct DOM manipulation', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    // trigger an error on the name field to put it in state
    const nameInput = screen.getByTestId('name');
    await user.type(nameInput, 'a');
    await user.clear(nameInput);
    await waitFor(() =>
      expect(screen.getByTestId('name-error').textContent).not.toBe('')
    );

    // Add a non-field element — MO fires but no fields are missing (covers
    // the !names.has(name) === false branch in the MO callback)
    const form = screen.getByTestId('form');
    await act(async () => {
      form.appendChild(document.createElement('div'));
    });
    expect(screen.getByTestId('name-error').textContent).not.toBe('');

    // Remove the input directly from the DOM — bypassing React
    await act(async () => {
      nameInput.parentElement?.removeChild(nameInput);
    });

    // MutationObserver fires, dispatches removeField → error cleared
    await waitFor(() =>
      expect(screen.getByTestId('name-error').textContent).toBe('')
    );
  });
});
