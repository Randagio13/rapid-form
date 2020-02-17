export interface MultiSelectValues {
  (options: HTMLOptionsCollection): string
}

const multiSelectValues: MultiSelectValues = options => {
  const v = Array.from(options)
    .filter(o => o.selected)
    .map(o => o.value)
  return v.join(',')
}

export default multiSelectValues
