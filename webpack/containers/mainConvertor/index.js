import {connect} from 'react-redux'
import MainConvertor from 'components/mainConvertor'
import {isUploadedImage} from 'selectors/uploader'
import {resetImage} from 'reducers/uploader'

const mapStateToProps = (state) => ({
  isUploadedImage: isUploadedImage(state)
})

const mapDispatchToProps = (dispatch) => ({
  resetImage: () => dispatch(resetImage())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainConvertor)
