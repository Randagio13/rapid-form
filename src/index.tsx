import { Form } from 'components'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import reducers from 'reducers'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const cps = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(reducers, cps)

const renderApp = (Component: any) => {
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        {Component}
      </Provider>
    </AppContainer>
  ), document.getElementById('app'))
}

const testOnSubmit = (event: any) => {
  alert(event)
}

renderApp(
  <Form onSubmit={testOnSubmit} id='formId'>
    <input type='text' />
  </Form>
)

if (Reflect.get(module, 'hot') !== undefined) {
  // tslint:disable-next-line:no-var-requires
  const nextApp = require('./components').default
  Reflect.get(module, 'hot').accept('./components', () => { renderApp(nextApp) })
}
