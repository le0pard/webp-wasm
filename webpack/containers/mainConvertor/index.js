import {connect} from 'react-redux'
import MainConvertor from 'components/mainConvertor'
import {isEmptyState, isHaveEncodedImage} from 'selectors/uploader'
import {resetImage} from 'reducers/uploader'

const mapStateToProps = (state) => ({
  libwebpVersion: state.settings.libwebpVersion,
  isEmptyState: isEmptyState(state),
  isEncodingImage: state.uploader.isEncodingImage,
  isHaveEncodedImage: isHaveEncodedImage(state)
})

const mapDispatchToProps = (dispatch) => ({
  resetImage: () => dispatch(resetImage())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainConvertor)
