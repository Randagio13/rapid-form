import React, { FunctionComponent, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import useRapidForm from './hooks/useRapidForm'
import { SubmitCallback } from './hooks/useRapidForm'
import _ from 'lodash'
const Form: FunctionComponent = () => {
  const {
    errors,
    validation,
    handleSubmit,
    reset,
    submitValidation,
    values,
    setValue,
    setError,
  } = useRapidForm()
  useEffect(() => {
    console.log('errors', errors)
  }, [errors])
  const s: SubmitCallback = (values, err, e): void => {
    console.log('values', values)
    if (_.isEmpty(err)) {
      reset(e)
    }
  }
  const setDefaultValue = () => {
    setValue('selectData', 'selezione 1')
  }
  const setDefaultError = () => {
    setError({
      name: 'password',
      message: 'Custom error',
      code: 'VALIDATION_ERROR',
    })
  }
  return (
    <form
      id="rapidForm"
      ref={submitValidation}
      autoComplete="off"
      onSubmit={handleSubmit(s)}
    >
      <label>Username:</label>
      <input name="username" ref={validation} required />
      <label id="username-error">{errors.username?.message}</label>
      <br />
      <br />
      <label>Name:</label>
      <input name="name" ref={validation} />
      <br />
      <br />
      <label>Email:</label>
      <input
        name="email"
        type="email"
        ref={validation}
        defaultValue="ale"
        required
      />
      <label id="email-error">{errors.email?.message}</label>
      <br />
      <br />
      <label>Password:</label>
      <input name="password" type="password" ref={validation} required />
      <label id="password-error">{errors.password?.message}</label>
      <br />
      <br />
      <label>Privacy:</label>
      <input name="privacy" type="checkbox" ref={validation} required />
      <label id="privacy-error">{errors.privacy?.message}</label>
      <br />
      <br />
      <label>Calendar:</label>
      <input name="calendar" type="date" ref={validation} required />
      <label id="calendar-error">{errors.calendar?.message}</label>
      <br />
      <br />
      <label>Number:</label>
      <input name="number" type="number" ref={validation} required />
      <label id="number-error">{errors.number?.message}</label>
      <br />
      <br />
      <label>Select:</label>
      <select name="selectData" ref={validation} required defaultValue="">
        <option value="">choose an option</option>
        <option value="selezione 1">selezione 1</option>
        <option value="selezione 2">selezione 2</option>
        <option value="selezione 3">selezione 3</option>
      </select>
      <label id="selectData-error">{errors.selectData?.message}</label>
      <br />
      <br />
      <label>Multi-select:</label>
      <select
        multiple
        name="selectDataMultiple"
        ref={validation}
        required
        defaultValue={['']}
      >
        <option value="">choose an option</option>
        <option value="selezione 1">selezione 1</option>
        <option value="selezione 2">selezione 2</option>
        <option value="selezione 3">selezione 3</option>
      </select>
      <label id="selectDataMultiple-error">
        {errors.selectDataMultiple?.message}
      </label>
      <br />
      <br />
      <label>Radio:</label>
      <input name="radio" type="radio" ref={validation} required value="male" />
      Male
      <br />
      <input name="radio" type="radio" ref={validation} value="female" />
      Female
      <br />
      <input name="radio" type="radio" ref={validation} value="" />
      Nothing
      <label id="radio-error">{errors.radio?.message}</label>
      <br />
      <br />
      Range
      <input
        name="range"
        type="range"
        ref={validation}
        required
        defaultValue="0"
      />
      <label id="radio-error">{errors.range?.message}</label>
      <br />
      <br />
      <button type="button" onClick={setDefaultValue}>
        Set defaultValue
      </button>
      <br />
      <br />
      <button type="button" onClick={setDefaultError}>
        Set Error
      </button>
      <br />
      <br />
      <pre>{`values: ${JSON.stringify(values, null, 2)}`}</pre>
      <pre>{`errors: ${JSON.stringify(errors, null, 2)}`}</pre>
    </form>
  )
}

ReactDOM.render(<Form />, document.getElementById('root'))
