import * as React from 'react'
import * as ReactDOM from 'react-dom'
import useRapidForm from './components/useRapidForm'

const Form = () => {
  const { data, validation, errors } = useRapidForm()
  console.log('data :', data)
  return (
    <form>
      <input name='username' ref={validation} required />
      {`The field's value is ${data.length} character(s) long. And ${errors} errors`}
    </form>
  )
}

ReactDOM.render(<Form />, document.getElementById('root'))
