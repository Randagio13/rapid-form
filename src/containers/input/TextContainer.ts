import { Text } from 'components'
import { connect } from 'react-redux'
import { setCheckError } from 'reducers/form/form'
import { bindActionCreators } from 'redux'

interface IState {
  input: object,
  form: {
    theme: string
  }
}

const mapStateToProps = ({ input, form: { theme } }: IState, props: any): any => {
  return { ...input, ...props, theme }
}

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({setCheckError}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Text)
