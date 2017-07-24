import { Themes, validationMethod } from 'helpers'
import { Map } from 'immutable'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackOnClick, setCheckError } from 'types'

export interface ITextProps {
  children?: any,
  className?: string,
  key?: string,
  name?: string,
  type: string,
  value?: string,
  theme?: string,
  onClick?: callbackOnClick,
  setCheckError?: setCheckError
}

class Text extends React.Component<ITextProps, any> {
  static propTypes = {
    className: PropTypes.string,
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    setCheckError: PropTypes.func,
    style: PropTypes.object,
    theme: PropTypes.string,
    type: PropTypes.oneOf([
      'text', 'file', 'password'
    ]).isRequired
  }
  public render (): JSX.Element {
    return this.handleRenderByTheme()
  }
  private handleValidation = (event: any): any => {
    const { setCheckError: checkError, ...props } = this.props
    const method = Reflect.get(this.props, 'data-validation')
    const val = Reflect.get(event.target, 'value')
    const required = Reflect.get(props, 'required')
    const key = Reflect.get(props, 'data-key')
    const isValid = validationMethod(method, val)
    if (!method || !required) {
      return checkError({...props, value: val}, key, Map())
    }
    checkError({...props, value: val}, key, isValid)
  }
  private handleRenderByTheme = (): JSX.Element => {
    const { setCheckError: checkError, theme, type, ...allProps } = this.props
    const themeClass = new Themes(theme)
    const cmp = <input {...allProps} onChange={this.handleValidation} />
    const props = { onChange: this.handleValidation, ...allProps }
    return themeClass.renderField(type, props, cmp)
  }
}

export default Text
