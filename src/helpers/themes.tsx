import FileUpload from 'material-ui-icons/FileUpload'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
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
        return (
          <div>
            <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>
          </div>
        )
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
          case 'hidden':
            const { value } = props
            return <TextField type={type} {...props} value={value || ''} />
          case 'file':
            const { value, error, ...p } = props
            return (
              <div>
                <Button variant='raised' onClick={this.handleInputFile}>
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
            const { multiple, value, placeholder, withChip, multiCheckbox } = p
            Reflect.deleteProperty(p, 'withChip')
            Reflect.deleteProperty(p, 'multiCheckbox')
            const input = <Input id='select-placeholder' />
            if (multiple) {
              const v = value || []
              const renderValue = !withChip
                ? (selected: any) => selected.join(', ')
                : (selected: any) => selected.map((val: any, k: number) => {
                  return <Chip key={k} label={val} />
                })
              return !placeholder
                ? <Select value={v} renderValue={renderValue} {...p}>{this.renderMultipleSelect(children, v, multiCheckbox)}</Select>
                : (
                  <FormControl>
                    <InputLabel htmlFor='select-placeholder'>{placeholder}</InputLabel>
                    <Select value={v} renderValue={renderValue} input={input} {...p}>
                      {this.renderMultipleSelect(children, v, multiCheckbox)}
                    </Select>
                  </FormControl>
                )
            }
            return !placeholder
              ? <Select native {...p}>{children}</Select>
              : (
                <FormControl>
                  <InputLabel htmlFor='select-placeholder'>{placeholder}</InputLabel>
                  <Select native input={input} {...p}>{children}</Select>
                </FormControl>
              )
          default:
            return cmp
        }
      default:
        return cmp
    }
  }
  private renderMultipleSelect = (options: any, val: any[], multiCheckbox?: boolean): any[] => {
    const opts = Array.isArray(options) ? options : [options]
    return opts.map((option: any, key: number): JSX.Element => {
      const { props } = option
      const { value, children } = props
      const checked = val.indexOf(value) > -1
      return multiCheckbox ? (
        <MenuItem key={value} value={value}>
          <Checkbox checked={checked} />
          <ListItemText primary={children} />
        </MenuItem>
      ) : (
        <MenuItem key={value} value={value}>
          <ListItemText primary={children} />
        </MenuItem>
      )
    })
  }
}

export default Themes
