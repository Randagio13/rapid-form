# Rapid React Form

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
      <input name="name" ref={validation} pattern={/\d+/} />
      {errors.email?.message}
      <button type="submit">Submit</button>
    </form>
  )
}

```

## Error handler

Our error object made as follows:

```tsx

{
  [fieldName: string]: {
    error: boolean,
    message: string,
    code: 'VALIDATION_ERROR' | 'EMPTY_ERROR'
  }
}

```

## License

This repository is published under the [MIT](LICENSE) license.
