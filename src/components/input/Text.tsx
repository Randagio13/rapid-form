import * as PropTypes from 'prop-types'
import * as React from 'react'
import { callbackOnClick } from 'types'

export interface ITextProps {
  key?: string,
  name: string,
  type: string,
  value?: string,
  onClick?: callbackOnClick,
  dispatch?: () => void
}

class Text extends React.Component<ITextProps, {}> {
  static propTypes = {
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'text', 'file', 'password'
    ]).isRequired
  }
  public render (): JSX.Element {
    const { type, name, key } = this.props
    console.log('props in text component', this.props)
    return <input key={key} type={type} name={name} />
  }
}

export default Text
