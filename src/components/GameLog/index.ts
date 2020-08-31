import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/store'
import View from './view'

const mapStateToProps = (state: RootState) => ({
  gameMessages: state.gameMessages,
})

const connector = connect(mapStateToProps)

export type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(View)
