<div align="center">
  
# Rapid Form

[![NPM](https://nodei.co/npm/rapid-form.png?compact=true)](https://nodei.co/npm/rapid-form/)
<br />
[![](https://img.shields.io/npm/dt/rapid-form.svg?style=flat-square)](https://www.npmjs.com/package/rapid-form)

</div>

The `rapid-form` npm package is a tool designed to simplify the creation and management of forms in web applications. It provides a streamlined way to handle form state, validation, and submission, making it easier for developers to implement complex forms without having to write repetitive boilerplate code.

## Installation

```bash
  # NPM
  npm install rapid-form

  # YARN
  yarn add rapid-form

  #PNPM
  pnpm add rapid-form
```

## Quick Start

```tsx

import { useRapidForm } from 'rapid-form'

function App() {
  const { refValidation, errors } = useRapidForm()

  const  handleSubmit = () => {
    // check errors
  }

  return (
    <form
      id="rapidForm"
      ref={(ref) => {
        refValidation(ref)
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <input name="username" placeholder="Username" required />
      {errors.username?.message}
      // OR
      {errors.username && yourI18Label[errors.username.code]}
      <label>Email:</label>
      <input name="email" type="email" required />
      {errors.email?.message}
      <label>Age:</label>
      <input name="age" required pattern="\d+" />
      {errors.age?.message}
      <button type="submit">Submit</button>
    </form>
  )
}

```

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
