// import { TextContainer } from 'containers'
import { ButtonContainer, SelectContainer } from 'containers'
import * as React from 'react'
import typesInput from './typesInput'

interface IPropsTypes {
  type?: string,
  children?: any,
  formid?: any
}

const typesManager = (typeCmp: any|string, props: IPropsTypes, key?: string, cmp?: any): null|any => {
  const { formid } = props
  switch (typeCmp) {
    case 'input':
      const { type } = props
      return typesInput(type, props, key)
    case 'button':
      return <ButtonContainer {...props} />
    case 'select':
      return <SelectContainer data-key={key} {...props} />
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
          return typesManager(tc, {...pc, formid}, i, c)
        })
        return React.createElement(typeCmp, {...otherProps, key, formid}, nc)
      }
      if (typeof hasChild === 'string') {
        return React.createElement(typeCmp, {...otherProps, key, formid}, hasChild)
      }
      const typeChild = Reflect.get(hasChild.valueOf(), 'type')
      const propsChild = Reflect.get(hasChild.valueOf(), 'props')
      const newChildren = typesManager(typeChild, {...propsChild, formid}, key, hasChild)
      return React.createElement(typeCmp, {...otherProps, key, formid}, newChildren)
  }
}

export default typesManager
