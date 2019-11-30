import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useRapidForm from './components/useRapidForm'

const Form = () => {
  const { data, errors, validation } = useRapidForm()
  console.log('data :', data)
  console.log('errors :', errors)
  return (
    <form autoComplete='off'>
      <input name='username' ref={validation} required />
      <br />
      <br />
      <input name='name' ref={validation} required />
      <br />
      <input name='privacy' type='checkbox' ref={validation} required />
      <br />
      <br />
      <br />
      <pre>{`data: ${JSON.stringify(data, null, 2)}`}</pre>
      <pre>{`errors: ${JSON.stringify(errors, null, 2)}`}</pre>
    </form>
  )
}

ReactDOM.render(<Form />, document.getElementById('root'))
