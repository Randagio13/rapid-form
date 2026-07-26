import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { type SchemaResolver, useRapidForm } from '../src/index.js';

function RadioResolverForm({ resolver }: { resolver: SchemaResolver }) {
  const { refValidation, values, numberOfRequiredFields } = useRapidForm();

  return (
    <form
      ref={(ref) => {
        refValidation(ref, { resolver });
      }}
    >
      <label>
        <input
          type="radio"
          name="plan"
          value="free"
          data-testid="plan-free"
          required
        />
        Free
      </label>
      <label>
        <input
          type="radio"
          name="plan"
          value="pro"
          data-testid="plan-pro"
          required
        />
        Pro
      </label>
      <label>
        <input
          type="radio"
          name="plan"
          value="max"
          data-testid="plan-max"
          required
        />
        Max
      </label>
      <span data-testid="plan-value">{values.plan?.value ?? ''}</span>
      <span data-testid="required-count">{numberOfRequiredFields}</span>
    </form>
  );
}

describe('radio groups', () => {
  test('resolver mode collects the checked radio value', async () => {
    const seenValues: Record<string, string>[] = [];
    const resolver: SchemaResolver = (values) => {
      seenValues.push(values);
      return {};
    };
    const user = userEvent.setup();

    render(<RadioResolverForm resolver={resolver} />);

    await user.click(screen.getByTestId('plan-pro'));

    await waitFor(() =>
      expect(seenValues.at(-1)).toEqual(
        expect.objectContaining({ plan: 'pro' })
      )
    );
    expect(screen.getByTestId('plan-value').textContent).toBe('pro');
  });

  test('required radio groups count as one required field', async () => {
    const resolver: SchemaResolver = () => ({});
    const user = userEvent.setup();

    render(<RadioResolverForm resolver={resolver} />);

    await user.click(screen.getByTestId('plan-pro'));

    await waitFor(() =>
      expect(screen.getByTestId('required-count').textContent).toBe('1')
    );
  });
});
