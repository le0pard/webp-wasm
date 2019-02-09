import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './uploader-form.sass'

export default class UploaderForm extends React.Component {
  static propTypes = {
    imageData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
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
      isDragover: false
    }
  }

  setImageFile(imageFile) {
    if (imageFile.type.match('image.*')) {
      this.props.encodeImage(imageFile)
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

  renderImageInfo(imageData) {
    return (
      <div>
        <ul>
          <li>Name: {imageData.name}</li>
          <li>Size: {imageData.size}</li>
          <li>Type: {imageData.type}</li>
        </ul>
      </div>
    )
  }

  render() {
    const {imageData} = this.props
    const {isDragover} = this.state

    return (
      <div className='uploader-container'>
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
        {imageData && this.renderImageInfo(imageData)}
      </div>
    )
  }
}
