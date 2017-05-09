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

renderApp(<div>{'Ciao'}</div>)

if (Reflect.get(module, 'hot') !== undefined) {
  const nextApp = require('./components').default
  Reflect.get(module, 'hot').accept('./components', () => { renderApp(nextApp) })
}
