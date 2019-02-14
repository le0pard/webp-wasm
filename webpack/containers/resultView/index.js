import {connect} from 'react-redux'
import ResultView from 'components/resultView'

const mapStateToProps = (state) => ({
  encodedImageData: state.uploader.encodedImageData
})

export default connect(
  mapStateToProps
)(ResultView)
