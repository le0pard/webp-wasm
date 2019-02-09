import React from 'react'
import MainConvertor from 'containers/mainConvertor'
import pgtuneLogo from './pgtune.svg'

import './dashboard.sass'

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header-wrapper">
          <div className="dashboard-header-logo">
            <img alt="Webp-Wasm"
              className="dashboard-header-logo__svg"
              src={pgtuneLogo} />
          </div>
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
