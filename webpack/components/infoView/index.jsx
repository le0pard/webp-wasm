import React from 'react'
import PropTypes from 'prop-types'

export default class InfoView extends React.Component {
  static propTypes = {
    version: PropTypes.string.isRequired
  }

  render() {
    const {version} = this.props

    return (
      <p>
        Convert your jpg or png image into webp format.
        Webp version <strong>{version}</strong>
      </p>
    )
  }
}
