import * as serialize from 'form-serialize'
import { Themes, typesManager } from 'helpers'
import { List } from 'immutable'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackSubmit } from 'types'

/**
 * @interface IFormProps
 */
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
  setFields?: (fields: any[]) => void,
  setTheme?: (theme: string) => void,
  overrideTheme?: object,
  checkAllReqFields?: () => void,
  theme: string
}

/**
 * Main component
 * @class Form
 * @extends {React.Component<IFormProps, any>}
 */
class Form extends React.Component<IFormProps, any> {
  static propTypes = {
    checkAllReqFields: PropTypes.func.isRequired,
    fields: PropTypes.instanceOf(List),
    id: PropTypes.string.isRequired,
    method: PropTypes.oneOf(['get', 'post']).isRequired,
    onSubmit: PropTypes.func,
    overrideTheme: PropTypes.object,
    setFields: PropTypes.func.isRequired,
    setTheme: PropTypes.func.isRequired,
    theme: PropTypes.oneOf(['material-ui'])
  }
  componentDidMount (): void {
    const { fields, setFields, setTheme, theme } = this.props
    if (fields instanceof List && fields.size === 0) {
      setFields(this.readChildren())
    }
    if (theme) {
      setTheme(theme)
    }
  }
  public render (): any {
    const { children, id, name, fields, onSubmit, method } = this.props
    if (fields instanceof List && fields.size === 0) {
      return null
    }
    return this.renderByThemes((
      <form key={id} id={id} name={name || id} method={method} onSubmit={this.handleSubmit}>
        {fields.toJS()}
      </form>
    ))
  }
  private renderByThemes = (cmp: JSX.Element) => {
    const { theme, overrideTheme } = this.props
    const themes = new Themes(theme)
    return themes.renderByTheme(cmp, overrideTheme)
  }
  private readChildren = (): any[] => {
    const { children, id, key, theme } = this.props
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
  private handleSubmit = (event: any): void => {
    const { onSubmit, id, fields, checkAllReqFields } = this.props
    event.preventDefault()
    const formElement = document.querySelector(`#${id}`)
    const data = serialize(formElement, { hash: true })
    const requiredEl = document.getElementById(id).querySelectorAll('[required]').length
    const nElement = Object.keys(data).length
    const isEmpty = nElement === 0 || requiredEl > nElement
    console.log('isEmpty --->', isEmpty)
    console.log('onSubmit --->', onSubmit)
    if (typeof onSubmit === 'function' && !isEmpty) {
      return onSubmit(event, data)
    }
    checkAllReqFields()
  }
}

export default Form
