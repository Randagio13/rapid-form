import Button from 'material-ui/Button'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import * as React from 'react'

/**
 * Themes
 */
class Themes {
  themeName: string
  constructor (themeName: string) {
    this.themeName = themeName
  }
  renderByTheme (component: any, override = {}): JSX.Element {
    switch (this.themeName) {
      case 'material-ui':
        const theme = createMuiTheme(override)
        // Old material-UI
        return <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>
        // return component
      default:
        return component
    }
  }
  renderField<C> (type: string, props: any, cmp?: C) {
    switch (this.themeName) {
      case 'material-ui':
        switch (type) {
          case 'text':
          case 'email':
          case 'password':
            const { value } = props
            return <TextField type={type} {...props} value={value || ''} />
          case 'button':
            const { children , ...p} = props
            return <Button {...p}>{children}</Button>
          default:
            return cmp
        }
      default:
        return cmp
    }
  }
}

export default Themes
