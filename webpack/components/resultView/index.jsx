import React from 'react'
import PropTypes from 'prop-types'

import './result-view.sass'

export default class ResultView extends React.Component {
  static propTypes = {
    encodedImageData: PropTypes.shape({
      blobURL: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.imageRef = React.createRef()
    this.linkRef = React.createRef()
  }

  componentDidMount() {
    const {blobURL} = this.props.encodedImageData
    this.imageRef.current.src = blobURL
    this.linkRef.current.href = blobURL
    this.linkRef.current.download = 'image.webp'
  }

  componentDidUpdate(prevProps) {
    const {blobURL} = prevProps.encodedImageData
    if (blobURL !== this.props.encodedImageData.blobURL) {
      window.URL.revokeObjectURL(blobURL)
    }
  }

  componentWillUnmount() {
    const {blobURL} = this.props.encodedImageData
    window.URL.revokeObjectURL(blobURL)
  }

  render() {
    const {width, height} = this.props.encodedImageData

    return (
      <div className="result-view-container">
        <img className="result-view-img" ref={this.imageRef} src="" />
        <div className="result-view-save-wrapper">
          <a ref={this.linkRef} className="result-view-save-link">
            Save webp ({width}x{height})
          </a>
        </div>
      </div>
    )
  }
}
