import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackOnClick } from 'types'

export interface ITextProps {
  children?: any,
  className?: string,
  key?: string,
  name?: string,
  type: string,
  value?: string,
  onClick?: callbackOnClick,
  dispatch?: () => void
}

class Text extends React.Component<ITextProps, any> {
  static propTypes = {
    className: PropTypes.string,
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.oneOf([
      'text', 'file', 'password'
    ]).isRequired
  }
  public render (): JSX.Element {
    const { dispatch, ...allProps } = this.props
    return <input {...allProps} />
  }
}

export default Text
