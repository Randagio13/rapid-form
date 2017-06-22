import { Form, IFormProps } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface IState {
  form: object
}

const mapStateToProps = ({ form }: IState, props: IFormProps) => {
  return { ...form, ...props }
}

export default connect(mapStateToProps)(Form as any)
