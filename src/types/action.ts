interface IAction {
  payload: any,
  type: string,
  fields?: any
}

export const Action: IAction = {
  payload: null,
  type: ''
}
