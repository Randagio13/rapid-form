import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useRapidForm from './components/useRapidForm'

const Form = () => {
  const { data, validation, errors } = useRapidForm()
  const v = data ? data.username.value.length : ''
  console.log('data :', data)
  return (
    <form>
      <input name='username' ref={validation} required />
      <br />
      <input name='name' ref={validation} required />
      {`The field's value is ${v} character(s) long. And ${errors} errors`}
    </form>
  )
}

ReactDOM.render(<Form />, document.getElementById('root'))
