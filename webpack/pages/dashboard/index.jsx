import React from 'react'
import MainConvertor from 'containers/mainConvertor'

import './dashboard.sass'

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header-wrapper">
          <div className="dashboard-header-title">
            <h1 className="dashboard-header-title__text">
              Webp Wasm
            </h1>
          </div>
        </div>
        <MainConvertor />
      </div>
    )
  }
}
