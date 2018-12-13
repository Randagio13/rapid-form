import { Form } from 'components'
import { connect } from 'react-redux'
import * as formActionCreators from 'reducers/form/form'
import { bindActionCreators } from 'redux'

interface IState {
  form: object
}

const mapStateToProps = ({ form }: IState, props: any): any => {
  return { ...form, ...props }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  ...formActionCreators
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)
