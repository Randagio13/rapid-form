// import { TextContainer } from 'containers'
import { ButtonContainer } from 'containers'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import typesInput from './typesInput'

interface IPropsTypes {
  type?: string,
  children?: any
}

const typesManager = (typeCmp: any|string, props: IPropsTypes, key?: string, cmp?: any ): null|any => {
  switch (typeCmp) {
    case 'input':
      const { type } = props
      return typesInput(type, props, key)
    case 'button':
      return <ButtonContainer {...props} />
    case undefined:
      console.error('Warning: The prop `type` is marked as required, but its value is `undefined`')
      return null
    default:
      const { children, ...otherProps } = props
      const hasChild = Reflect.get(props, 'children')
      if (Array.isArray(hasChild) && hasChild.length > 1) {
        const nc = hasChild.map((c: any, i: any) => {
          const tc = Reflect.get(c.valueOf(), 'type')
          const pc = Reflect.get(c.valueOf(), 'props')
          return typesManager(tc, pc, i, c)
        })
        return React.createElement(typeCmp, {...otherProps, key}, nc)
      }
      if (typeof hasChild === 'string') {
        return React.createElement(typeCmp, {...otherProps, key}, hasChild)
      }
      const typeChild = Reflect.get(hasChild.valueOf(), 'type')
      const propsChild = Reflect.get(hasChild.valueOf(), 'props')
      const newChildren = typesManager(typeChild, propsChild, key, hasChild)
      return React.createElement(typeCmp, {...otherProps, key}, newChildren)
  }
}

export default typesManager
