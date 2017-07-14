// import FormContainer from './containers/form/FormContainer'
import { FormContainer } from 'containers'
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
  <FormContainer onSubmit={testOnSubmit} id='formId'>
    <div className='testClass'>
      <input type='text' name='username' />
    </div>
    <input type='password' name='password' />
  </FormContainer>
)

if (Reflect.get(module, 'hot') !== undefined) {
  // tslint:disable-next-line:no-var-requires
  const nextApp = require('./components').default
  Reflect.get(module, 'hot').accept('./components', () => { renderApp(nextApp) })
}
