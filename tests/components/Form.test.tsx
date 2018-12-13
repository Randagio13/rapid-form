import * as React from 'react'
import { create } from 'react-test-renderer'
import { Form } from '../../src/components'

test('Form component', () => {
  const component = create(<Form />)
  const tree = component.toJSON()
  console.log('FORM COMP -->', tree)
  expect(tree).toMatchSnapshot()
})
