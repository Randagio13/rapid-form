import { getPropTypes } from 'prop-types-ts'
import * as React from 'react'
import { callbackOnClick } from 'types'

export interface ITextProps {
  name: string,
  type: string,
  value?: string,
  onClick?: callbackOnClick,

}

class Text extends React.Component<ITextProps, {}> {
  static propTypes = getPropTypes(ITextProps)
  public render (): JSX.Element {
    console.log(this.props)
    return <input />
  }
}

export default Text
