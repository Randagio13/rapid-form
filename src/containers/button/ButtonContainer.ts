import { Button } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface IState {
  button: object
}

const mapStateToProps = ({ button }: IState, props: any): any => {
  return { ...button, ...props }
}

export default connect(mapStateToProps)(Button)
