import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { type ElementType, Form } from './utils/FormComponent'

describe('Default settings', () => {
  test('Input type text by default event with no errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-text',
        type: 'text',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} />)
    let input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('type', 'text')
    await user.type(input, 'test')
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', 'test')
    const inputError = screen.getByTestId('input-text-error')
    expect(inputError.textContent).toBe('')
    const submitButton = screen.getByTestId('submit-button')
    await fireEvent.submit(submitButton)
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', '')
  })

  test('Input type text by blur event with no errors and reset', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-text',
        type: 'text',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} config={{ eventType: 'blur', resetOnSubmit: false }} />)
    let input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('type', 'text')
    await user.type(input, 'test')
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', 'test')
    const inputError = screen.getByTestId('input-text-error')
    expect(inputError.textContent).toBe('')
    const submitButton = screen.getByTestId('submit-button')
    await fireEvent.submit(submitButton)
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', 'test')
  })
  
  test('Input type text by blur event with no errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-text',
        type: 'text',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} config={{ eventType: 'blur' }} />)
    let input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('type', 'text')
    await user.type(input, 'test')
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', 'test')
    const inputError = screen.getByTestId('input-text-error')
    expect(inputError.textContent).toBe('')
  })

  test('Input type text by blur event with errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-text',
        type: 'text',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} config={{ eventType: 'blur' }} />)
    let input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('type', 'text')
    await user.type(input, ' ')
    await user.tab()
    input = screen.getByTestId('input-text')
    expect(input).toHaveProperty('value', ' ')
    const inputError = screen.getByTestId('input-text-error')
    expect(inputError.textContent).not.toBe('')
  })

  test('Input type email by default event', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-email',
        type: 'email',
        required: true
      }
    ]
    const user = userEvent.setup()
    const email = 'test@a.co'
    render(<Form elements={elements} />)
    let input = screen.getByTestId('input-email')
    expect(input).toHaveProperty('type', 'email')
    await user.type(input, email)
    input = screen.getByTestId('input-email')
    expect(input).toHaveProperty('value', email)
  })

  test('Input type email by blur event', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-email',
        type: 'email',
        required: true
      }
    ]
    const user = userEvent.setup()
    const email = 'test@a.co'
    render(<Form elements={elements} config={{ eventType: 'blur' }} />)
    let input = screen.getByTestId('input-email')
    expect(input).toHaveProperty('type', 'email')
    await user.type(input, email)
    await user.tab()
    input = screen.getByTestId('input-email')
    expect(input).toHaveProperty('value', email)
  })

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

  test('Input type password by default event without errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-password',
        type: 'password',
        required: true
      }
    ]
    const user = userEvent.setup()
    const password = '1234567'
    render(<Form elements={elements} />)
    let input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('type', 'password')
    await user.type(input, password)
    input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('value', password)
    const inputError = screen.getByTestId('input-password-error')
    expect(inputError.textContent).toBe('')
  })

  test('Input type password by default event with errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-password',
        type: 'password',
        required: true
      }
    ]
    const user = userEvent.setup()
    const password = '123456'
    render(<Form elements={elements} />)
    let input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('type', 'password')
    await user.type(input, password)
    input = screen.getByTestId('input-password')
    expect(input).toHaveProperty('value', password)
    const inputError = screen.getByTestId('input-password-error')
    expect(inputError.textContent).toBe('Invalid format or required field')
  })
  
  test('Input type checkbox by default event with no errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-checkbox',
        type: 'checkbox',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} />)
    let input = screen.getByTestId('input-checkbox')
    expect(input).toHaveProperty('type', 'checkbox')
    await user.click(input)
    input = screen.getByTestId('input-checkbox')
    expect(input).toHaveProperty('checked', true)
    expect(input).toHaveProperty('value', 'on')
    const inputError = screen.getByTestId('input-checkbox-error')
    expect(inputError.textContent).toBe('')
  })
  
  test('Input type checkbox by default event with errors', async () => {
    const elements: ElementType[] = [
      {
        as: 'input',
        name: 'input-checkbox',
        type: 'checkbox',
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} />)
    let input = screen.getByTestId('input-checkbox')
    expect(input).toHaveProperty('type', 'checkbox')
    await user.click(input)
    input = screen.getByTestId('input-checkbox')
    expect(input).toHaveProperty('checked', true)
    expect(input).toHaveProperty('value', 'on')
    await user.click(input)
    expect(input).toHaveProperty('checked', false)
    const inputError = screen.getByTestId('input-checkbox-error')
    expect(inputError.textContent).not.toBe('')
  })
  test('Select element with default value', async () => {
    const elements: ElementType[] = [
      {
        as: 'select',
        type: 'select',
        name: 'select-element',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ],
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} />)
    const select = screen.getByTestId('select-element')
    await user.selectOptions(select, 'option1')
    expect(select).toHaveProperty('value', 'option1')
    const selectError = screen.getByTestId('select-element-error')
    expect(selectError.textContent).toBe('')
  })

  test('Select element with custom value', async () => {
    const elements: ElementType[] = [
      {
        as: 'select',
        name: 'select-element',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ],
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} />)
    const select = screen.getByTestId('select-element')
    await user.selectOptions(select, 'option1')
    expect(select).toHaveProperty('value', 'option1')
    await user.selectOptions(select, 'option2')
    expect(select).toHaveProperty('value', 'option2')
    const selectError = screen.getByTestId('select-element-error')
    expect(selectError.textContent).toBe('')
  })

  test('Select element with no value selected', async () => {
    const elements: ElementType[] = [
      {
        as: 'select',
        name: 'select-element',
        options: [
          { label: 'No value', value: '' },
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ],
        required: true
      }
    ]
    const user = userEvent.setup()
    render(<Form elements={elements} />)
    const select = screen.getByTestId('select-element')
    await user.selectOptions(select, '')
    expect(select).toHaveProperty('value', '')
    const selectError = screen.getByTestId('select-element-error')
    expect(selectError.textContent).not.toBe('')
  })
})
