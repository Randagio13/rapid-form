import setErrors from './setErrors'
import multiSelectValues from './multiSelect'
const handleChange = (e: any, dispatch: any) => {
  const m = e.target.multiple
  const v = m
    ? multiSelectValues(e.target?.options, e.target.dataset?.typevalue)
    : e.target?.value
  const n = e.target.name
  const t = e.target.type
  const r = e.target.required
  const c = e.target?.checked
  const p = e.target?.pattern
  const data: any = {
    [n]: {
      value: v,
      name: n,
      type: t,
      required: r,
      checked: c,
      pattern: p
    }
  }
  setErrors(data[n], dispatch)
}

export default handleChange
