import { Form, IFormProps } from 'components'
import { connect } from 'react-redux'
import * as formCreators from 'reducers/form/form'
import { bindActionCreators } from 'redux'

interface IState {
  form: object
}

const mapStateToProps = ({ form }: IState, props: any) => {
  return { ...form, ...props }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators(formCreators, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Form)
