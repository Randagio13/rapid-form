import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { type ElementType, Form } from './utils/FormComponent'

describe('Custom settings', () => {
  test('Input type text with custom validation function without errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-text',
        type: 'text',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(
      <Form
        elements={elements}
        config={{
          validations: {
            'input-text': {
              validation: ({ value }) => value.length > 3,
              message: 'The input must be more than 3 characters'
            }
          }
        }}
      />
    )
    let input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('type', 'text')
    await user.type(input, 'test')
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', 'test')
    const inputError = screen.getByTestId('input-text-error')
    expect(inputError.textContent).toBe('')
  })

  test('Input type text with custom validation function with errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-text',
        type: 'text',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(
      <Form
        elements={elements}
        config={{
          validations: {
            'input-text': {
              validation: ({ value }) => value.length > 3,
              message: 'The input must be more than 3 characters'
            }
          }
        }}
      />
    )
    let input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('type', 'text')
    await user.type(input, 'tes')
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', 'tes')
    const inputError = screen.getByTestId('input-text-error')
    expect(inputError.textContent).toBe(
      'The input must be more than 3 characters'
    )
  })

  test('Input type password with custom validation function without errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-password',
        type: 'password',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(
      <Form
        elements={elements}
        config={{
          validations: {
            'input-password': {
              validation: ({ value }) => value.length > 10,
              message: 'The input must be more than 10 characters'
            }
          }
        }}
      />
    )
    const value = 'test1234567'
    let input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('type', 'password')
    await user.type(input, value)
    input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('value', value)
    const inputError = screen.getByTestId('input-password-error')
    expect(inputError.textContent).toBe('')
  })

  test('Input type password with custom validation function with errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-password',
        type: 'password',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(
      <Form
        elements={elements}
        config={{
          validations: {
            'input-password': {
              validation: ({ value }) => value.length > 10,
              message: 'The input must be more than 10 characters'
            }
          }
        }}
      />
    )
    const value = 'test123'
    let input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('type', 'password')
    await user.type(input, value)
    input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('value', value)
    const inputError = screen.getByTestId('input-password-error')
    expect(inputError.textContent).toBe(
      'The input must be more than 10 characters'
    )
  })
  test('Select element with custom validation function without errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'select',
        name: 'select-element',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ],
        required: true
      }
    ]
    const user = userEvent.setup()
    render(
      <Form
        elements={elements}
        config={{
          validations: {
            'select-element': {
              validation: ({ value }) => value !== '',
              message: 'Please select an option'
            }
          }
        }}
      />
    )
    let select = screen.getByTestId('select-element')
    expect(select).toBeDefined()
    await user.selectOptions(select, 'option1')
    select = screen.getByTestId('select-element')
    expect(select).toHaveProperty('value', 'option1')
    const selectError = screen.getByTestId('select-element-error')
    expect(selectError.textContent).toBe('')
  })
  test('Select element with custom validation function with errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'select',
        name: 'select-element',
        options: [
          { value: '', label: 'No value' },
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ],
        required: true
      }
    ]
    const user = userEvent.setup()
    render(
      <Form
        elements={elements}
        config={{
          validations: {
            'select-element': {
              validation: ({ value }) => value !== '',
              message: 'Please select an option'
            }
          }
        }}
      />
    )
    let select = screen.getByTestId('select-element')
    expect(select).toBeDefined()
    await user.selectOptions(select, '')
    select = screen.getByTestId('select-element')
    expect(select).toHaveProperty('value', '')
    const selectError = screen.getByTestId('select-element-error')
    expect(selectError.textContent).toBe('Please select an option')
  })
})
