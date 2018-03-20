import Dialog from 'material-ui/Dialog'
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
  class Develop extends React.Component<any, any> {
    public state = {
      viewForm: true
    }
    public handleButton = () => {
      const { viewForm } = this.state
      this.setState({
        viewForm: !viewForm
      })
    }
    public handleSwitch = () => {
      const { viewForm } = this.state
      return viewForm ? (
        <RapidForm
          method='post'
          onSubmit={testOnSubmit}
          id='formId'
          theme='material-ui'
          overrideTheme={themeOverride}
          dangerouslyUseGlobalCSS={true}
        >
          <select
            name='users'
            placeholder='select users'
            data-validation='empty'
            required
            autoWidth
          >
            <option key='0' value='Alessandro'>
              {'Alessandro'}
            </option>
            <option key='1' value='Bruce'>
              {'Bruce'}
            </option>
          </select>
          <input
            type='email'
            name='username'
            label='Email'
            data-validation='empty'
            required
            fullWidth
          />
          <button type='submit' color='primary' variant='raised'>
            {'Sign up'}
          </button>
        </RapidForm>
      ) : (
        <Dialog open={true} disableAutoFocus={true} disableEnforceFocus={true}>
          <RapidForm
            method='post'
            onSubmit={testOnSubmit}
            id='createUser'
            theme='material-ui'
            overrideTheme={themeOverride}
            className='pippo'
          >
            <input type='hidden' name='userId' value='13' />
            <div>
              <input
                type='email'
                name='username'
                label='Email'
                data-validation='empty'
                required
                fullWidth
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                label='Password'
                data-validation='empty'
                required
                fullWidth
                autoComplete='new-password'
              />
            </div>
            <div>
              <button disabled type='submit' color='primary' variant='raised'>
                {'create'}
              </button>
            </div>
          </RapidForm>
        </Dialog>
      )
    }
    public render () {
      return (
        <div>
          {this.handleSwitch()}
          <button onClick={this.handleButton}>{'change form'}</button>
        </div>
      )
    }
  }
  const renderApp = (Component: any) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('app')
    )
  }

  const testOnSubmit = (event: any, data: object): void => {
    debugger
    event.preventDefault()
    alert(JSON.stringify(data))
  }

  renderApp(Develop)

  // renderApp(
  //   <div>
  //     <RapidForm method='post' onSubmit={testOnSubmit} id='formId' theme='material-ui' overrideTheme={themeOverride}>
  //       <div className='testClass'>
  //         <select name='company' data-validation='empty' required>
  //           <option key='0' value=''>{'choose a company'}</option>
  //           <option key='1' value='ciao'>{'ciao'}</option>
  //         </select>
  //       </div>
  //       <div className='testClass'>
  //         <input type='file' name='data' label='Data' data-validation='empty' required />
  //       </div>
  //       <div className='testClass'>
  //         <button type='submit' color='primary' raised>{'Sign up'}</button>
  //       </div>
  //     </RapidForm>
  //   </div>
  // )

  if (Reflect.get(module, 'hot') !== undefined) {
    // tslint:disable-next-line:no-var-
    const nextApp = require('./src').default
    Reflect.get(module, 'hot').accept('./src', () => {
      renderApp(nextApp)
    })
  }
}
// ### Login form
/* <RapidForm method='post' onSubmit={testOnSubmit} id='formId' theme='material-ui' overrideTheme={themeOverride}>
  <div className='testClass'>
    <input type='email' name='username' label='Username' data-validation='empty' required />
  </div>
  <div className='testClass'>
    <input
      type='password'
      name='password'
      label='Password'
      data-validation='empty'
      autoComplete='new-password'
      required
      />
  </div>
  <div className='testClass'>
    <button type='submit' color='primary' raised>{'Sign up'}</button>
  </div>
</RapidForm> */
/* <RapidForm method='post' onSubmit={testOnSubmit} id='createUser' theme='material-ui' overrideTheme={themeOverride}>
<div>
  <input
    type='email'
    name='username'
    label='Email'
    data-validation='empty'
    required
    fullWidth
  />
</div>
<div>
  <input
    type='password'
    name='password'
    label='Password'
    data-validation='empty'
    required
    fullWidth
    autoComplete='new-password'
  />
</div>
<div>
  <button type='submit' color='primary' raised>{'create'}</button>
</div>
</RapidForm> */
