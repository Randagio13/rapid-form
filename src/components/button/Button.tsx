import { Themes } from 'helpers'
import { List } from 'immutable'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackOnClick } from 'types'

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
  style?: object,
  onClick?: callbackOnClick,
  errors?: any
}

/**
 * @class Button
 * @extends {React.Component<IProps, any>}
 */
class Button extends React.Component<IProps, any> {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    className: PropTypes.string,
    errors: PropTypes.instanceOf(List),
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    style: PropTypes.object,
    theme: PropTypes.string,
    type: PropTypes.oneOf([
      'submit', 'reset', 'button', 'menu'
    ]).isRequired
  }
  public render (): JSX.Element {
    const { dispatch, children, ...allProps } = this.props
    return this.handleRenderByTheme()
  }
  private handleRenderByTheme = (): JSX.Element => {
    const { children, theme, errors, ...allProps } = this.props
    const themeClass = new Themes(theme)
    const p = {...allProps, disabled: errors.size > 0}
    const cmp = <button {...p}>{children}</button>
    return themeClass.renderField('button', {...p, children}, cmp)
  }
}

export default Button
