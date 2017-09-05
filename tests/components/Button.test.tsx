import { shallow } from 'enzyme'
import * as React from 'react'
import { create } from 'react-test-renderer'
import Button from '../../src/components/button/Button'

const component = create(
  <Button type='submit'>{'Sign up'}</Button>
).toJSON()

test('Snapshot', () => {
  // expect(component).toMatchSnapshot()
})

test('Check property component', () => {
  expect(component.type).toEqual('button')
  expect(component.props.type).toEqual('submit')
  expect(component.children[0]).toEqual('Sign up')
})
