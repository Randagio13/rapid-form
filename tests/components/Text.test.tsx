import { shallow } from 'enzyme'
import * as React from 'react'
import { create } from 'react-test-renderer'
import Text from '../../src/components/input/Text'

export const testOnSubmit = (event: any) => {
  alert(event)
}

const component = create(
  <Text name='text' type='text' />
).toJSON()

test('Snapshot', () => {
  expect(component).toMatchSnapshot()
})

test('Check property component', () => {
  expect(component.type).toEqual('input')
  expect(component.props.type).toEqual('text')
  expect(component.props.name).toEqual('text')
})
