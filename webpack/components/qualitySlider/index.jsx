import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider/lib/Slider'

import './quality-slider.sass'

export default class QualitySlider extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue
    }
  }

  onSlideChange(value) {
    this.setState((prevState) => ({
      ...prevState,
      value
    }))
  }

  render() {
    const {defaultValue, onChange} = this.props
    const {value} = this.state

    return (
      <div className="quality-slider">
        <div className="quality-slider__label">
          Webp image quality: {value}
        </div>
        <Slider
          defaultValue={defaultValue}
          min={10}
          max={100}
          step={1}
          onChange={this.onSlideChange.bind(this)}
          onAfterChange={(value) => onChange(value)}
        />
      </div>

    )
  }
}
