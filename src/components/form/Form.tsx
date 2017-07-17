import { typesManager } from 'helpers'
import { List } from 'immutable'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackSubmit } from 'types'

interface IFormProps {
  error?: any[],
  id: string,
  method: string,
  key?: string,
  name?: string,
  disabled?: boolean
  onSubmit?: callbackSubmit,
  children?: [React.ReactNode, any[]],
  fields?: any,
  setFields?: (fields: any[]) => void
}

class Form extends React.Component<IFormProps, any> {
  static propTypes = {
    fields: PropTypes.instanceOf(List),
    id: PropTypes.string.isRequired,
    method: PropTypes.oneOf(['get', 'post']).isRequired,
    onSubmit: PropTypes.func,
    setFields: PropTypes.func.isRequired
  }
  componentDidMount (): void {
    const { fields, setFields } = this.props
    if (fields instanceof List && fields.size === 0) {
      setFields(this.readChildren())
    }
  }
  public render (): any {
    const { children, id, name, fields, onSubmit, method } = this.props
    if (fields instanceof List && fields.size === 0) {
      return null
    }
    return (
      <form key={id} id={id} name={name || id} method={method} onSubmit={onSubmit}>
        {fields.toJS()}
      </form>
    )
  }
  readChildren = (): any[] => {
    const { children, id, key } = this.props
    if (children.length > 1) {
      return children.map((i, k) => {
        const prc = Reflect.get(i.valueOf(), 'props')
        const typeCmp = Reflect.get(i.valueOf(), 'type')
        return typesManager(typeCmp, prc, `${k}`, i)
      })
    }
    const propsComponent = Reflect.get(children.valueOf(), 'props')
    const type = Reflect.get(children.valueOf(), 'type')
    return typesManager(type, propsComponent, !key && id)
  }
}

export default Form
