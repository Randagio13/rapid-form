import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import type { SchemaResolver } from '../src/index.js';
import { type ElementType, Form } from './utils/FormComponent.js';

describe('Schema resolver', () => {
  const emailAndName: ElementType[] = [
    { as: 'input', name: 'email', type: 'email' },
    { as: 'input', name: 'name', type: 'text' }
  ];

  test('shows error from sync resolver on input', async () => {
    const resolver: SchemaResolver = ({ email }) => ({
      email: email.includes('@') ? undefined : 'Invalid email'
    });
    const user = userEvent.setup();
    render(<Form elements={emailAndName} config={{ resolver }} />);

    await user.type(screen.getByTestId('email'), 'bad');
    await waitFor(() => {
      expect(screen.getByTestId('email-error').textContent).toBe(
        'Invalid email'
      );
    });
  });

  test('clears error when resolver returns undefined', async () => {
    const resolver: SchemaResolver = ({ email }) => ({
      email: email.includes('@') ? undefined : 'Invalid email'
    });
    const user = userEvent.setup();
    render(<Form elements={emailAndName} config={{ resolver }} />);

    await user.type(screen.getByTestId('email'), 'bad');
    await waitFor(() =>
      expect(screen.getByTestId('email-error').textContent).toBe(
        'Invalid email'
      )
    );

    await user.clear(screen.getByTestId('email'));
    await user.type(screen.getByTestId('email'), 'good@example.com');
    await waitFor(() =>
      expect(screen.getByTestId('email-error').textContent).toBe('')
    );
  });

  test('validates all fields at once on each event', async () => {
    const resolver: SchemaResolver = ({ email, name }) => ({
      email: email.length > 0 ? undefined : 'Email required',
      name: name.length >= 3 ? undefined : 'Min 3 chars'
    });
    const user = userEvent.setup();
    render(<Form elements={emailAndName} config={{ resolver }} />);

    await user.type(screen.getByTestId('name'), 'ab');
    await waitFor(() => {
      expect(screen.getByTestId('email-error').textContent).toBe(
        'Email required'
      );
      expect(screen.getByTestId('name-error').textContent).toBe('Min 3 chars');
    });
  });

  test('supports async resolver', async () => {
    const resolver: SchemaResolver = async ({ email }) => {
      await new Promise((r) => setTimeout(r, 10));
      return { email: email.includes('@') ? undefined : 'Async invalid email' };
    };
    const user = userEvent.setup();
    render(<Form elements={emailAndName} config={{ resolver }} />);

    await user.type(screen.getByTestId('email'), 'nope');
    await waitFor(() =>
      expect(screen.getByTestId('email-error').textContent).toBe(
        'Async invalid email'
      )
    );
  });

  test('submit runs resolver and shows errors without resetting when invalid', async () => {
    const resolver: SchemaResolver = ({ email }) => ({
      email: email.includes('@') ? undefined : 'Invalid email'
    });
    const user = userEvent.setup();
    render(<Form elements={emailAndName} config={{ resolver }} />);

    await user.type(screen.getByTestId('email'), 'bad');
    await fireEvent.submit(screen.getByTestId('submit-button'));

    await waitFor(() =>
      expect(screen.getByTestId('email-error').textContent).toBe(
        'Invalid email'
      )
    );
    // form not reset — value still present
    expect((screen.getByTestId('email') as HTMLInputElement).value).toBe('bad');
  });

  test('submit resets form when resolver returns no errors', async () => {
    const resolver: SchemaResolver = () => ({});
    const user = userEvent.setup();
    render(<Form elements={emailAndName} config={{ resolver }} />);

    await user.type(screen.getByTestId('email'), 'good@example.com');
    await fireEvent.submit(screen.getByTestId('submit-button'));

    await waitFor(() =>
      expect((screen.getByTestId('email') as HTMLInputElement).value).toBe('')
    );
  });

  test('resolver called with vi.fn spy', async () => {
    const spy = vi.fn<SchemaResolver>().mockReturnValue({});
    const user = userEvent.setup();
    render(<Form elements={emailAndName} config={{ resolver: spy }} />);

    await user.type(screen.getByTestId('email'), 'a');
    await waitFor(() => expect(spy).toHaveBeenCalled());
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ email: 'a' }));
  });

  test('collects checkbox value via resolver', async () => {
    const resolver: SchemaResolver = ({ agree }) => ({
      agree: agree === 'true' ? undefined : 'Must agree'
    });
    const user = userEvent.setup();
    const elements: ElementType[] = [
      { as: 'input', name: 'agree', type: 'checkbox' }
    ];
    render(<Form elements={elements} config={{ resolver }} />);

    // check → agree = 'true' → no error
    await user.click(screen.getByTestId('agree'));
    await waitFor(() =>
      expect(screen.getByTestId('agree-error').textContent).toBe('')
    );

    // uncheck → agree = 'false' → error
    await user.click(screen.getByTestId('agree'));
    await waitFor(() =>
      expect(screen.getByTestId('agree-error').textContent).toBe('Must agree')
    );
  });
});
