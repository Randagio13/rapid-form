// import FormContainer from './containers/form/FormContainer'
import { FormContainer } from 'containers'
import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import reducers from 'reducers'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const cps = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(reducers, cps)
const { env: { NODE_ENV } } = process

if (NODE_ENV !== 'production') {
  // const renderApp = (Component: any) => {
  //   ReactDOM.render((
  //     <AppContainer>
  //       <Provider store={store}>
  //         {Component}
  //       </Provider>
  //     </AppContainer>
  //   ), document.getElementById('app'))
  // }

  // const testOnSubmit = (event: any, data: object): void => {
  //   event.preventDefault()
  //   alert(JSON.stringify(data))
  // }

  // renderApp(
  //   <FormContainer method='post' onSubmit={testOnSubmit} id='formId' theme='material-ui'>
  //     <input type='text' name='username' label='Username' data-validation='empty' required />
  //     <div className='testClass'>
  //       <input type='password' name='password' label='Password' data-validation='empty'  />
  //     </div>
  //     <div className='testClass'>
  //       <button type='submit' color='primary' raised>{'Sign up'}</button>
  //     </div>
  //   </FormContainer>
  // )

  // if (Reflect.get(module, 'hot') !== undefined) {
  //   // tslint:disable-next-line:no-var-requires
  //   const nextApp = require('./components').default
  //   Reflect.get(module, 'hot').accept('./components', () => { renderApp(nextApp) })
  // }
}
/**
 * Rapid Form Export
 * @param { children, ...props } object
 */
const RapidForm = ({children, ...props}: any) => (
  <AppContainer>
    <Provider store={store}>
      <FormContainer {...props}>
        {children}
      </FormContainer>
    </Provider>
  </AppContainer>
)
export default RapidForm
