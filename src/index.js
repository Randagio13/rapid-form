// @flow
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { FormContainer } from 'containers'

const renderApp = (Component) => {
  render((
    <AppContainer>
      <Component />
    </AppContainer>
  ), document.getElementById('app'))
}

renderApp(FormContainer)

if (module.hot) {
  const nextApp = require('./containers').default
  module.hot.accept('./containers', () => { renderApp(nextApp) })
}
