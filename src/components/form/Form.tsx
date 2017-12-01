import * as serialize from 'form-serialize'
import { Themes, typesManager } from 'helpers'
import { List, Map } from 'immutable'
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
  setFields?: (fields: any[], id: string) => void,
  setTheme?: (theme: string) => void,
  overrideTheme?: object,
  checkAllReqFields?: (id: string) => void,
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
    fields: PropTypes.instanceOf(Map),
    id: PropTypes.string.isRequired,
    method: PropTypes.oneOf(['get', 'post']).isRequired,
    onSubmit: PropTypes.func,
    overrideTheme: PropTypes.object,
    setFields: PropTypes.func.isRequired,
    setTheme: PropTypes.func.isRequired,
    theme: PropTypes.oneOf(['material-ui'])
  }
  componentDidMount (): void {
    const { fields, setFields, setTheme, theme, id } = this.props
    debugger
    if (fields instanceof Map && fields.size === 0) {
      setFields(this.readChildren(), id)
    }
    if (theme) {
      setTheme(theme)
    }
  }
  componentWillUpdate (nextProps: any): void {
    const { fields, setFields } = this.props
    const { id } = nextProps
    const f = fields.find((v: any, k: any) => k === id)
    if (!f && fields.size > 0) {
      setFields(this.readChildren(), id)
    }
  }
  public render (): any {
    const { children, id, name, fields, onSubmit, method } = this.props
    // if (fields instanceof Map && fields.size === 0) {
    //   return null
    // }
    const content = fields.get(id) ? fields.get(id).toJS() : null
    console.log('CONTENT --> ', content, fields.toJS())
    return this.renderByThemes((
      <form key={id} id={id} name={name || id} method={method} onSubmit={this.handleSubmit}>
        {content}
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
        const p = {...prc, formid: id}
        return typesManager(typeCmp, p, `${k}`, i)
      })
    }
    const propsComponent = Reflect.get(children.valueOf(), 'props')
    const type = Reflect.get(children.valueOf(), 'type')
    const ps = {...propsComponent, formid: id}
    return [typesManager(type, ps, !key && id)]
  }
  private handleSubmit = (event: any): void => {
    const { onSubmit, id, fields, checkAllReqFields } = this.props
    event.preventDefault()
    const formElement = document.querySelector(`#${id}`)
    const data = serialize(formElement, { hash: true })
    const nElement = Object.keys(data).length
    const isEmpty = nElement === 0
    if (typeof onSubmit === 'function' && !isEmpty) {
      return onSubmit(event, data)
    }
    checkAllReqFields(id)
  }
}

export default Form
