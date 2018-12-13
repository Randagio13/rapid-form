import { Themes, validationMethod } from 'helpers'
import { Map } from 'immutable'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackOnClick, setCheckError } from 'types'

/**
 * @export
 * @interface IProps
 */
export interface IProps {
  children?: any,
  className?: string,
  key?: string,
  name?: string,
  type: string,
  theme: string,
  dispatch?: () => void,
  setCheckError?: setCheckError,
  style?: object,
  onClick?: callbackOnClick,
  errors?: any
}

/**
 * @class Select
 * @extends {React.Component<IProps, any>}
 */
class Select extends React.Component<IProps, any> {
  public static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.array
    ]),
    className: PropTypes.string,
    errors: PropTypes.instanceOf(Map),
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    setCheckError: PropTypes.func,
    style: PropTypes.object,
    theme: PropTypes.string
  }
  public render (): JSX.Element {
    const { dispatch, children, ...allProps } = this.props
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
      return checkError({ ...props, value: val }, key, Map())
    }
    checkError({ ...props, value: val }, key, isValid)
  }
  private handleRenderByTheme = (): JSX.Element => {
    const { setCheckError: checkError, children, theme, errors, ...allProps } = this.props
    const themeClass = new Themes(theme)
    const cmp = <select {...allProps}>{children}</select>
    const props = { onChange: this.handleValidation, ...allProps }
    return themeClass.renderField('select', { ...props, children }, cmp)
  }
}

export default Select
