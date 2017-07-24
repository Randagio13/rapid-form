import { Button } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface IState {
  button: object,
  form: {
    theme: string,
    errors: any
  }
}

const mapStateToProps = ({ button, form: { theme, errors } }: IState, props: any): any => {
  return { ...button, ...props, theme, errors }
}

const mapDispatchToProps = (dispatch: any, ownProps: any): any => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Button)
