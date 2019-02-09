import React from 'react'
import PropTypes from 'prop-types'
import InfoView from 'components/infoView'
import UploaderForm from 'containers/uploaderForm'
import ConfigurationView from 'containers/configurationView'

import './main-convertor.sass'

export default class MainConvertor extends React.Component {
  static propTypes = {
    isUploadedImage: PropTypes.bool.isRequired,
    resetImage: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetImage()
  }

  render() {
    const {isUploadedImage} = this.props

    return (
      <div className="main-convertor">
        <div className="main-convertor-form-wrapper">
          <h4 className="main-convertor-form-subtitle">
            Parameters of your system
          </h4>
          <UploaderForm />
        </div>
        <div className="main-convertor-result-wrapper">
          {!isUploadedImage && <InfoView />}
          {isUploadedImage && <ConfigurationView />}
        </div>
      </div>
    )
  }
}
