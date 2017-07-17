import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackOnClick } from 'types'

export interface IProps {
  children?: any,
  className?: string,
  key?: string,
  name?: string,
  type: string,
  dispatch?: () => void,
  style?: object,
  onClick?: callbackOnClick
}

class Button extends React.Component<IProps, any> {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    className: PropTypes.string,
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.oneOf([
      'submit', 'reset', 'button', 'menu'
    ]).isRequired
  }
  public render (): JSX.Element {
    const { dispatch, children, ...allProps } = this.props
    return (
      <button {...allProps}>
        {children}
      </button>
    )
  }
}

export default Button
