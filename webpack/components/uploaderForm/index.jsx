import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import QualitySlider from 'components/qualitySlider'

import './uploader-form.sass'

export default class UploaderForm extends React.Component {
  static propTypes = {
    imageData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired
    }),
    encodeImage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    /* drag functions */
    this.isDragPreventDefault = this.isDragPreventDefault.bind(this)
    this.isDragOver = this.isDragOver.bind(this)
    this.isNotDragOver = this.isNotDragOver.bind(this)
    this.isFileDropped = this.isFileDropped.bind(this)
    /* box ref */
    this.uploaderBoxRef = React.createRef()
    this.state = {
      quality: 90,
      isDragover: false,
      imageFile: null
    }
  }

  setImageFile(imageFile) {
    this.setState((prevState) => ({
      ...prevState,
      imageFile
    }), () => this.encodeImage())
  }

  encodeImage() {
    const {imageFile, quality} = this.state
    if (imageFile && imageFile.type && imageFile.type.match('image.*')) {
      this.props.encodeImage(imageFile, quality)
    }
  }

  isDragPreventDefault(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  isDragOver(e) {
    this.isDragPreventDefault(e)
    this.setState((prevState) => ({
      ...prevState,
      isDragover: true
    }))
  }

  isNotDragOver(e) {
    this.isDragPreventDefault(e)
    this.setState((prevState) => ({
      ...prevState,
      isDragover: false
    }))
  }

  isFileDropped(e) {
    this.isNotDragOver(e)
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      this.setImageFile(e.dataTransfer.files[0])
    }
  }

  componentDidMount() {
    const uploaderBox = this.uploaderBoxRef.current
    uploaderBox.addEventListener('drag', this.isDragPreventDefault)
    uploaderBox.addEventListener('dragstart', this.isDragPreventDefault)
    uploaderBox.addEventListener('dragover', this.isDragOver)
    uploaderBox.addEventListener('dragenter', this.isDragOver)
    uploaderBox.addEventListener('dragleave', this.isNotDragOver)
    uploaderBox.addEventListener('dragend', this.isNotDragOver)
    uploaderBox.addEventListener('drop', this.isFileDropped)
  }

  componentWillUnmount() {
    const uploaderBox = this.uploaderBoxRef.current
    uploaderBox.removeEventListener('drag', this.isDragPreventDefault)
    uploaderBox.removeEventListener('dragstart', this.isDragPreventDefault)
    uploaderBox.removeEventListener('dragover', this.isDragOver)
    uploaderBox.removeEventListener('dragenter', this.isDragOver)
    uploaderBox.removeEventListener('dragleave', this.isNotDragOver)
    uploaderBox.removeEventListener('dragend', this.isNotDragOver)
    uploaderBox.removeEventListener('drop', this.isFileDropped)
  }

  onInputChange(e) {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      this.setImageFile(e.currentTarget.files[0])
    }
  }

  humanFileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
  }

  renderImageInfo(imageData) {
    return (
      <div className="uploader-container-image">
        <h4 className="uploader-container-image-title">Image info</h4>
        <div className="uploader-container-image-info">
          <div className="uploader-container-image-info__key">Name:</div>
          <div className="uploader-container-image-info__value">{imageData.name}</div>
          <div className="uploader-container-image-info__key">Size:</div>
          <div className="uploader-container-image-info__value">{this.humanFileSize(imageData.size)}</div>
          <div className="uploader-container-image-info__key">Type:</div>
          <div className="uploader-container-image-info__value">{imageData.type}</div>
        </div>
      </div>
    )
  }

  onQualityChange(quality) {
    this.setState((prevState) => ({
      ...prevState,
      quality
    }), () => this.encodeImage())
  }

  render() {
    const {imageData} = this.props
    const {isDragover, quality} = this.state

    return (
      <div className="uploader-container">
        <form ref={this.uploaderBoxRef} className={classnames('uploader-box uploader-box--advanced', {
          'uploader-box--is-dragover': isDragover
        })} method="post" action="" encType="multipart/form-data">
          <div className="uploader-box__wrapper">
            <input onChange={this.onInputChange.bind(this)} id="uploaderInput" className="uploader-box__input" type="file" accept="image/*" />
            <label htmlFor="uploaderInput">
              <strong>Choose a file</strong>
              <span className="uploader-box__dragndrop"> or drag it here</span>
            </label>
          </div>
        </form>
        <div className="uploader-container-slide-box">
          <QualitySlider defaultValue={quality} onChange={this.onQualityChange.bind(this)} />
        </div>
        {imageData && this.renderImageInfo(imageData)}
      </div>
    )
  }
}
