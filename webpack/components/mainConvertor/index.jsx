import React from 'react'
import PropTypes from 'prop-types'
import InfoView from 'components/infoView'
import EncodeSpinner from 'components/encodeSpinner'
import UploaderForm from 'containers/uploaderForm'
import ResultView from 'containers/resultView'

import './main-convertor.sass'

export default class MainConvertor extends React.Component {
  static propTypes = {
    libwebpVersion: PropTypes.string,
    isEmptyState: PropTypes.bool.isRequired,
    isEncodingImage: PropTypes.bool.isRequired,
    isHaveEncodedImage: PropTypes.bool.isRequired,
    resetImage: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetImage()
  }

  render() {
    const {
      libwebpVersion,
      isEmptyState,
      isEncodingImage,
      isHaveEncodedImage
    } = this.props

    if (libwebpVersion) {
      return (
        <div className="main-convertor">
          <div className="main-convertor-form-wrapper">
            <UploaderForm />
          </div>
          <div className="main-convertor-result-wrapper">
            {isEmptyState && <InfoView version={libwebpVersion} />}
            {isEncodingImage && <EncodeSpinner />}
            {isHaveEncodedImage && <ResultView />}
          </div>
        </div>
      )
    } else {
      return (
        <EncodeSpinner />
      )
    }
  }
}
