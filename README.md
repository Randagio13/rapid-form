<div align="center">
  
# Rapid Form

[![NPM](https://nodei.co/npm/rapid-form.png?compact=true)](https://nodei.co/npm/rapid-form/)
<br />
[![](https://img.shields.io/npm/dt/rapid-form.svg?style=flat-square)](https://www.npmjs.com/package/rapid-form)

</div>

The Rapid Form is a React hook to develop an HTML form quickly.

## Installation

The Rapid Form is available as NPM package

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
      <input name="age" ref={validation} required pattern="\d+" />
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

- **values**:
  An object with all values

- **errors**:
  An object with all errors

- **validation**:
  A function to control each field (only with required attribute)

- **values**:
  Object where you can get form values in real-time

- **handleSubmit**:
  A function to put your submit callback. (params: (values, errors, event))

- **reset**:
  A simple way to reset the form

- **submitValidation**:
  A function to add a plus fields control to the submit event

## Contributors

Any contribution is appreciated. You can get started with the steps below:

1. Fork [this repository](https://github.com/Randagio13/rapid-form) (learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository.

3. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

4. I will attend to your pull request and provide some feedback.

## Need help?

Ping me [on Twitter](https://twitter.com/randagio19)

## License

This repository is licensed under the [MIT](LICENSE) License.

## Sponsor

Don't be shy! 😜

[:heart: Sponsor](https://github.com/sponsors/Randagio13)
