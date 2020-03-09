# Rapid React Form

[![npm](https://img.shields.io/npm/v/rapid-form?style=for-the-badge)](https://www.npmjs.com/package/rapid-form)

A react hook to manage your form in a rapid and easy way

## Installation

The rapid form is available as npm package

```bash
  # NPM
  npm install rapid-form

  # YARN
  yarn add rapid-form
```

## Quick Start

```tsx

import useRapidForm from 'rapid-form'

function App() {
  const {
    errors,
    validation,
    handleSubmit,
    reset, // not required
    submitValidation // not required
  } = useRapidForm()

  const s = (values, err, e) => {
    if (_.isEmpty(err)) {
      reset(e)
    }
  }

  return (
    <form
      id="rapidForm"
      ref={submitValidation}
      autoComplete="off"
      onSubmit={handleSubmit(s)}
    >
      <input name="username" ref={validation} placeholder="Username" required />
      {errors.username?.message}
      // OR
      {errors.username && yourI18Label[errors.username.code]}
      <label>Email:</label>
      <input name="email" type="email" ref={validation} required />
      {errors.email?.message}
      <label>Age:</label>
      <input name="age" ref={validation} required pattern={/\d+/} />
      {errors.age?.message}
      <button type="submit">Submit</button>
    </form>
  )
}

```

## Error handler

Our error object is made as follows:

```tsx

{
  [fieldName: string]: {
    error: boolean,
    message: string,
    code: 'VALIDATION_ERROR' | 'EMPTY_ERROR'
  }
}

```

## API

- errors:
  An object with all errors

- validation:
  A function to control each field (only with required attribute)

- handleSubmit:
  A function to put your submit callback. (params: (values, errors, event))

- reset:
  A simple way to reset the form

- submitValidation:
  A function to add a plus fields control to the submit event

## License

This repository is published under the [MIT](LICENSE) license.
