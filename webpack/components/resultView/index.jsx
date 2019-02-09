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
  }

  componentDidMount() {
    const {blobURL} = this.props.encodedImageData
    this.imageRef.current.src = blobURL
  }

  componentWillUnmount() {
    const {blobURL} = this.props.encodedImageData
    window.URL.revokeObjectURL(blobURL)
  }

  render() {
    return (
      <div className="result-view-container">
        <img className="result-view-img" ref={this.imageRef} src="" />
      </div>
    )
  }
}
