import { shallow } from 'enzyme'
import { List } from 'immutable'
import * as React from 'react'
import { create } from 'react-test-renderer'
import Form from '../../src/components/form/Form'
// import { setFields } from '../../src/reducers/form/form'

// const testOnSubmit = (event: any) => {
//   alert(event)
// }

// const comp = React.createElement('input')

// const component = create(
//   <Form id='formId' fields={List([comp])} setFields={setFields} />
// ).toJSON()

// test('Snapshot', () => {
//   expect(component).toMatchSnapshot()
// })

// test('Check property component', () => {
//   expect(component.type).toEqual('form')
//   expect(component.props.id).toEqual('formId')
//   // expect(component.props.name).toEqual('formId')
//   // expect(component.props.disabled).toEqual(true)
// })

// test('Check correct name if there is prop', () => {
//   const checkName = create(
//     <Form id='formId' name='formName' onSubmit={testOnSubmit}><input type='text' /></Form>
//   ).toJSON()
//   expect(checkName.props.name).toEqual('formName')
//   expect(checkName.props.name).not.toEqual('formId')
// })
