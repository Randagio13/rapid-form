import FileUpload from 'material-ui-icons/FileUpload'
import Button from 'material-ui/Button'
import Select from 'material-ui/Select'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
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
  handleInputFile = (): void => {
    this.inputFile.click()
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
          case 'file':
            const { value, error, ...p } = props
            console.log(props)
            return (
              <div>
                <Button raised onClick={this.handleInputFile}>
                  {'upload'}
                  <FileUpload />
                  <input
                    ref={(r) => {this.inputFile = r}}
                    style={{display: 'none'}}
                    type={type}
                    {...p}
                  />
                </Button>
                <Typography type='subheading'>{value || ''}</Typography>
              </div>

            )
          case 'button':
            const { children , ...p} = props
            return <Button {...p}>{children}</Button>
          case 'select':
            const { children , ...p} = props
            return <Select native {...p}>{children}</Select>
          default:
            return cmp
        }
      default:
        return cmp
    }
  }
}

export default Themes
