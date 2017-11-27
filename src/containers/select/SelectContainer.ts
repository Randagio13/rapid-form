import { Select } from 'components'
import { connect } from 'react-redux'
import { setCheckError } from 'reducers/form/form'
import { bindActionCreators } from 'redux'

interface IState {
  select: object,
  form: {
    theme: string,
    errors: any
  }
}

const mapStateToProps = ({ select, form: { theme, errors } }: IState, props: any): any => {
  return { ...select, ...props, theme, errors }
}

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({setCheckError}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Select)
