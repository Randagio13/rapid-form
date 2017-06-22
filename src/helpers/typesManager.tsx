import { TextContainer } from 'containers'
import * as React from 'react'

const typesManager = (type: string, props: object): null|any => {
  switch (type) {
    case 'text':
      return <TextContainer {...props} />
    default:
      return null
  }
}

export default typesManager
