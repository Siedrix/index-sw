import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'

import './styles/index.scss'

const render = (Root) => {
  ReactDOM.render(Root, document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept('./router.js', function (Root) {
    const Router = require('./router')
    render(<Router.default />)
  })
}

render(<Router />)
