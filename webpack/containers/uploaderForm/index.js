import {connect} from 'react-redux'
import WasmConverter from 'lib/wasmConverter'
import UploaderForm from 'components/uploaderForm'
import {uploadedImageName} from 'selectors/uploader'
import {
  uploadImageData,
  startEncoding,
  encodeSuccess,
  encodeError
} from 'reducers/uploader'

const mapStateToProps = (state) => ({
  uploadedImageName: uploadedImageName(state)
})

const mapDispatchToProps = (dispatch) => ({
  encodeImage: (imageObj) => {
    dispatch(uploadImageData({
      name: imageObj.name,
      size: imageObj.size,
      type: imageObj.type
    }))

    WasmConverter.encode(
      imageObj, 
      100, 
      () => dispatch(startEncoding())
    ).then((res) => {
      dispatch(encodeSuccess(res))
    }).catch(() => {
      dispatch(encodeError())
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploaderForm)
