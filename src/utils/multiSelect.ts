const multiSelectValues = (
  options: HTMLOptionsCollection,
  returnType?: 'array' | 'string'
) => {
  const v = Array.from(options)
    .filter(o => o.selected)
    .map(o => o.value)
  if (returnType === 'string') {
    return v.join(',')
  }
  return v
}

export default multiSelectValues
