import { FileContainer, TextContainer } from 'containers'
import * as React from 'react'

const typesInput = (type: string, props: any, key?: string, theme?: string) => {
  switch (type) {
    case 'text':
    case 'password':
    case 'email':
    case 'hidden':
      return <TextContainer key={key} data-key={key} {...props} />
    case 'file':
      return <FileContainer key={key} data-key={key} {...props} />
    case undefined:
      console.error('Warning: The prop `type` is marked as required, but its value is `undefined`')
      return null
    default:
      console.warn(`Warning: This prop type='${type}' is not supported`)
      return null
  }
}

export default typesInput
