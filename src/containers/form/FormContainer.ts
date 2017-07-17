import { Form } from 'components'
import { connect } from 'react-redux'
import { setFields } from 'reducers/form/form'
import { bindActionCreators } from 'redux'

interface IState {
  form: object
}

const mapStateToProps = ({ form }: IState, props: any): any => {
  return { ...form, ...props }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({setFields}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Form)
