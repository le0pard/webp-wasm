import React from 'react'

import './about.sass'

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="about-page">
        <p>
          <strong>Webp Wasm</strong> convert jpg or png image to webp by using WebAssembly. Webassembly (WASM) is an innovative low-level language that can run on all modern browsers. As the name suggests, this is an assembly-like language that have a very compact binary format (thus suitable to be loaded on web pages) and can run with near-native performance.
        </p>
        <h3>Useful links</h3>
        <ul>
          <li><a href="https://github.com/le0pard/webp-wasm">Source code</a></li>
          <li><a href="http://leopard.in.ua/">My blog</a></li>
        </ul>
      </div>
    )
  }
}
