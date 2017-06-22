import { ITextProps, Text } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface IState {
  input: object
}

const mapStateToProps = ({ input }: IState, props: any) => {
  return { ...input, ...props }
}

export default connect(mapStateToProps)(Text)
