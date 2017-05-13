import * as React from 'react'
import { callbackSubmit } from 'types'

interface IFormProps {
  error?: [object],
  id: string,
  name?: string,
  disabled?: boolean,
  onSubmit: callbackSubmit,
  children: React.ReactChild
}

export class Form extends React.Component<IFormProps, undefined> {
  render () {
    const { children, id, name, disabled } = this.props
    console.log({children})
    return <form id={id} name={name || id} disabled={disabled}>{children}</form>
  }
}
