export interface MultiSelectValues {
  (options: HTMLOptionsCollection, returnType?: 'array' | 'string'):
    | string
    | string[]
}

const multiSelectValues: MultiSelectValues = (options, returnType) => {
  const v = Array.from(options)
    .filter(o => o.selected)
    .map(o => o.value)
  if (returnType === 'string') {
    return v.join(',')
  }
  return v
}

export default multiSelectValues
