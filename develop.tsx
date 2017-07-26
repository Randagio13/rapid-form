import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import RapidForm from './src'
const { env: { NODE_ENV } } = process
const themeOverride = {
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
        color: 'white',
        height: 48,
        padding: '0 30px'
      }
    }
  }
}
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
    <RapidForm method='post' onSubmit={testOnSubmit} id='formId' theme='material-ui' overrideTheme={themeOverride}>
      <div>
        <input type='text' name='username' label='Username' data-validation='empty' required />
      </div>
      <div className='testClass'>
        <input type='password' name='password' label='Password' data-validation='empty' autoComplete='new-password' />
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
