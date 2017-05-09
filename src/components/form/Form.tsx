import * as React from 'react'

interface IFormProps {
  error: object
}

export class Form extends React.Component<IFormProps, undefined> {
  render () {
    return <div>{'Form'}</div>
  }
}
