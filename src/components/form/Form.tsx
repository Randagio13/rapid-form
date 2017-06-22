import { typesManager } from 'helpers'
import * as React from 'react'
import { callbackSubmit } from 'types'

export interface IFormProps {
  error?: [object],
  id: string,
  name?: string,
  disabled?: boolean,
  onSubmit: callbackSubmit,
  children: React.ReactNode
}

export default class Form extends React.Component<IFormProps, undefined> {
  readChildren = (): any => {
    const { children } = this.props
    const propsComponent = Reflect.get(children.valueOf(), 'props')
    const type = Reflect.get(propsComponent, 'type')
    return typesManager(type, propsComponent)
  }
  render () {
    const { children, id, name, disabled } = this.props
    return <form id={id} name={name || id} disabled={disabled}>{this.readChildren()}</form>
  }
}
