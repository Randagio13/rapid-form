import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useRapidForm from './hooks/useRapidForm'

const Form = () => {
  const { data, errors, validation, handleSubmit, reset } = useRapidForm()
  console.log('data :', data)
  console.log('errors :', errors)
  const s = (values: any, errors: any) => {
    console.log('values s function :', values, errors)
    reset()
  }
  return (
    <form autoComplete="off" onSubmit={handleSubmit(s)}>
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
      <input name="email" type="email" ref={validation} />
      <br />
      <br />
      <label>Privacy:</label>
      <input name="privacy" type="checkbox" ref={validation} />
      <br />
      <br />
      <label>Calendar:</label>
      <input name="calendar" type="date" ref={validation} />
      <br />
      <br />
      <label>Number:</label>
      <input name="number" type="number" ref={validation} />
      <br />
      <br />
      <label>Select:</label>
      <select name="selectData" ref={validation} defaultValue="">
        <option value="">choose an option</option>
        <option value="selezione 1">selezione 1</option>
        <option value="selezione 2">selezione 2</option>
        <option value="selezione 3">selezione 3</option>
      </select>
      <br />
      <br />
      <label>Multi-select:</label>
      <select
        multiple
        name="selectDataMultiple"
        data-typevalue="array"
        ref={validation}
        defaultValue={[]}
      >
        <option value="">choose an option</option>
        <option value="selezione 1">selezione 1</option>
        <option value="selezione 2">selezione 2</option>
        <option value="selezione 3">selezione 3</option>
      </select>
      <br />
      <br />
      <label>Radio:</label>
      <input name="radio" type="radio" ref={validation} value="male" />
      Male
      <br />
      <input name="radio" type="radio" ref={validation} value="female" />
      Female
      <br />
      <input name="radio" type="radio" ref={validation} value="" />
      Nothing
      <br />
      <br />
      <button type="submit">submit</button>
      <br />
      <br />
      {/* <button type="reset" onClick={reset}>
        reset
      </button>
      <br />
      <br /> */}
      <pre>{`data: ${JSON.stringify(data, null, 2)}`}</pre>
      <pre>{`errors: ${JSON.stringify(errors, null, 2)}`}</pre>
    </form>
  )
}

ReactDOM.render(<Form />, document.getElementById('root'))
