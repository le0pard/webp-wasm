import React from 'react'
import PropTypes from 'prop-types'

export default class InfoView extends React.Component {
  static propTypes = {
    version: PropTypes.string.isRequired
  }

  render() {
    const {version} = this.props

    return (
      <React.Fragment>
        <p>
          Convert your jpg or png image into webp
        </p>
        <p>
          <strong>{version}</strong> webp library version is used
        </p>
      </React.Fragment>
    )
  }
}
