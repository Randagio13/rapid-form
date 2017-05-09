import { Form } from 'components'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

const renderApp = (Component: any) => {
  ReactDOM.render((
    <AppContainer>
      <Component />
    </AppContainer>
  ), document.getElementById('app'))
}

renderApp(Form)

if (Reflect.get(module, 'hot') !== undefined) {
  // tslint:disable-next-line:no-var-requires
  const nextApp = require('./components').default
  Reflect.get(module, 'hot').accept('./components', () => { renderApp(nextApp) })
}
