import {connect} from 'react-redux'
import WasmWebp from 'lib/wasmWebp'
import UploaderForm from 'components/uploaderForm'
import {
  uploadImageData,
  startEncoding,
  encodeSuccess,
  encodeError
} from 'reducers/uploader'

const mapStateToProps = (state) => ({
  imageData: state.uploader.imageData
})

const mapDispatchToProps = (dispatch) => ({
  encodeImage: (imageObj, quality) => {
    dispatch(uploadImageData({
      name: imageObj.name,
      size: imageObj.size,
      type: imageObj.type
    }))

    WasmWebp.encode(
      imageObj,
      quality,
      () => dispatch(startEncoding())
    ).then((res) => {
      dispatch(encodeSuccess(res))
    }).catch((err) => {
      dispatch(encodeError(err))
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploaderForm)
