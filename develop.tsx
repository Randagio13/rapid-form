import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import RapidForm from './src'
const { env: { NODE_ENV } } = process

if (NODE_ENV !== 'production') {
  const renderApp = (Component: any) => {
    ReactDOM.render((
      <AppContainer>
        {Component}
      </AppContainer>
    ), document.getElementById('app'))
  }

  const testOnSubmit = (event: any, data: object): void => {
    event.preventDefault()
    alert(JSON.stringify(data))
  }

  renderApp(
    <RapidForm method='post' onSubmit={testOnSubmit} id='formId' theme='material-ui'>
      <input type='text' name='username' label='Username' data-validation='empty' required />
      <div className='testClass'>
        <input type='password' name='password' label='Password' data-validation='empty'  />
      </div>
      <div className='testClass'>
        <button type='submit' color='primary' raised>{'Sign up'}</button>
      </div>
    </RapidForm>
  )

  if (Reflect.get(module, 'hot') !== undefined) {
    // tslint:disable-next-line:no-var-
    const nextApp = require('./src').default
    Reflect.get(module, 'hot').accept('./src', () => { renderApp(nextApp) })
  }
}
