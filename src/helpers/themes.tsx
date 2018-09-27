import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {
  createGenerateClassName,
  createMuiTheme,
  jssPreset,
  MuiThemeProvider
} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FileUpload from '@material-ui/icons/FileUpload'
import { create } from 'jss'
import * as React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'

/**
 * Themes
 */
class Themes {
  private themeName: string
  private inputFile: {
    click: () => void
  }
  constructor (themeName: string) {
    this.themeName = themeName
  }
  public renderByTheme (
    component: any,
    override = {},
    dangerouslyUseGlobalCSS = true
  ): JSX.Element {
    switch (this.themeName) {
      case 'material-ui':
        const theme = createMuiTheme(override)
        const styleNode = document.createComment('jss-rapid-form')
        document.head.insertBefore(styleNode, document.head.firstChild)
        const jss: any = create(jssPreset())
        jss.options.insertionPoint = 'jss-rapid-form'
        return (
          <JssProvider jss={jss} classNamePrefix='rapidForm-'>
            <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>
          </JssProvider>
        )
      default:
        return component
    }
  }
  public renderField = (type: string, props: any, cmp?: any): JSX.Element => {
    switch (this.themeName) {
      case 'material-ui':
        switch (type) {
          case 'text':
          case 'email':
          case 'password':
          case 'hidden':
            const { value: val, key: ke } = props
            return (
              <TextField
                key={`${type}-${ke}`}
                type={type}
                {...props}
                value={val || ''}
              />
            )
          case 'file':
            const { value: va, error: err, key, ...pr } = props
            const ref = (r: any) => (this.inputFile = r)
            return (
              <div>
                <Button
                  key={`${type}-${key}`}
                  variant='raised'
                  onClick={this.handleInputFile}
                >
                  {'upload'}
                  <FileUpload />
                  <input
                    ref={ref}
                    style={{ display: 'none' }}
                    type={type}
                    {...pr}
                  />
                </Button>
                <Typography variant='subheading'>{va || ''}</Typography>
              </div>
            )
          case 'button':
            const { children: child, key: k, ...other } = props
            return (
              <Button key={`${type}-${k}`} {...other}>
                {child}
              </Button>
            )
          case 'select':
            const { children, ...p } = props
            const {
              multiple,
              value,
              placeholder,
              withChip,
              multiCheckbox,
              error,
              required
            } = p
            Reflect.deleteProperty(p, 'withChip')
            Reflect.deleteProperty(p, 'multiCheckbox')
            const input = <Input id='select-placeholder' />
            const inputProps = { required }
            if (multiple) {
              Reflect.deleteProperty(p, 'value')
              const v = value === '' || !value ? [] : value
              const renderValue = !withChip
                ? (selected: any) => selected.join(', ')
                : (selected: any): any => {
                  if (selected) {
                    return selected.map((lab: any, ky: number) => {
                      return <Chip key={`chip-${ky}`} label={lab} />
                    })
                  }
                  return []
                }
              return !placeholder ? (
                <Select
                  value={v}
                  renderValue={renderValue}
                  inputProps={inputProps}
                  {...p}
                >
                  {this.renderMultipleSelect(children, v, multiCheckbox)}
                </Select>
              ) : (
                <FormControl error={error}>
                  <InputLabel htmlFor='select-placeholder'>
                    {placeholder}
                  </InputLabel>
                  <Select
                    inputProps={inputProps}
                    value={v}
                    renderValue={renderValue}
                    input={input}
                    {...p}
                  >
                    {this.renderMultipleSelect(children, v, multiCheckbox)}
                  </Select>
                </FormControl>
              )
            }
            return !placeholder ? (
              <Select
                value={v}
                native={true}
                inputProps={inputProps}
                {...p}
              >
                {children}
              </Select>
            ) : (
              <FormControl error={error}>
                <InputLabel htmlFor='select-placeholder'>
                  {placeholder}
                </InputLabel>
                <Select
                  value={v}
                  native={true}
                  input={input}
                  inputProps={inputProps}
                  {...p}
                >
                  {children}
                </Select>
              </FormControl>
            )
          default:
            return cmp
        }
      default:
        if (this.themeName) {
          console.warn(
            `%c'${this.themeName}' %cis not a valid theme, please insert correct name!`,
            'font-weight: bold; color: #f4381d',
            'font-weight: normal; color: #fff'
          )
        }
        return cmp
    }
  }
  private handleInputFile = (): void => {
    this.inputFile.click()
  }
  private renderMultipleSelect = (
    options: any,
    val: any[],
    multiCheckbox?: boolean
  ): any[] => {
    const opts = Array.isArray(options) ? options : [options]
    return opts.map((option: any, key: number): JSX.Element => {
      const { props } = option
      const { value, children, ...other } = props
      const checked = Array.isArray(val) ? val.indexOf(value) > -1 : false
      return multiCheckbox ? (
        <MenuItem key={`option-${key}`} value={value} {...other}>
          <Checkbox checked={checked} />
          <ListItemText primary={children} />
        </MenuItem>
      ) : (
        <MenuItem key={`option-${key}`} value={value} {...other}>
          <ListItemText primary={children} />
        </MenuItem>
      )
    })
  }
}

export default Themes
