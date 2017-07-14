import { TextContainer } from 'containers'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const typesInput = (type: string, props: any, key?: string) => {
  switch (type) {
    case 'text':
    case 'password':
      return <TextContainer key={key} {...props} />
    case undefined:
      console.error('Warning: The prop `type` is marked as required, but its value is `undefined`')
      return null
    default:
      console.warn(`Warning: This prop type='${type}' is not supported`)
      return null
  }
}

export default typesInput
