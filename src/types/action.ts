interface IActionForm {
  payload: any,
  type: string,
  fields?: any,
  theme?: string,
  errors?: any
}

export const Action: IActionForm = {
  payload: null,
  type: ''
}
