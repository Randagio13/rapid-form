import { FormContainer } from 'containers'
import * as React from 'react'
import { Provider } from 'react-redux'
import reducers from 'reducers'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const cps = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(reducers, cps)

class RapidForm extends React.Component<any, any> {
  public render (): JSX.Element {
    const { children, ...props } = this.props
    return (
      <Provider store={store}>
        <FormContainer {...props}>
          {children}
        </FormContainer>
      </Provider>
    )
  }
}

export default RapidForm
