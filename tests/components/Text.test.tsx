// TODO: Added mock Redux component
import { Text } from 'components'
import { shallow } from 'enzyme'
import * as React from 'react'
import { create } from 'react-test-renderer'

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
