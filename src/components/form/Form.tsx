import { typesManager } from 'helpers'
import { List } from 'immutable'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackSubmit } from 'types'

export interface IFormProps {
  error?: [object],
  id: string,
  name?: string,
  disabled?: boolean,
  onSubmit: callbackSubmit,
  children: [React.ReactNode, any[]],
  fields: any
}

export default class Form extends React.Component<IFormProps, undefined> {
  static propTypes = {
    fields: PropTypes.instanceOf(List)
  }
  componentDidMount (): any {
    const { fields } = this.props
    console.log(fields, this.props)
  }
  readChildren = (): any => {
    const { children } = this.props
    if (children.length > 1) {
      return children.map((i, k) => {
        const prc = Reflect.get(i.valueOf(), 'props')
        const typeCmp = Reflect.get(i.valueOf(), 'type')
        return typesManager(typeCmp, prc, `${k}`, i)
      })
    }
    const propsComponent = Reflect.get(children.valueOf(), 'props')
    const type = Reflect.get(propsComponent, 'type')
    return typesManager(type, propsComponent, 'ciao')
  }
  render () {
    const { children, id, name } = this.props
    return <form key={id} id={id} name={name || id}>{this.readChildren()}</form>
  }
}
