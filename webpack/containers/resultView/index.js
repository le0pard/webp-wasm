import {connect} from 'react-redux'
import ResultView from 'components/resultView'

const mapStateToProps = (state) => ({
  encodedImageData: state.uploader.encodedImageData
})

const mapDispatchToProps = (dispatch) => ({
  // handleClickTab: (tab) => dispatch(openConfigTab(tab))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultView)
