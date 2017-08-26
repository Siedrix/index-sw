import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { root } from 'baobab-react/higher-order'

import tree from '~core/tree'
import api from '~core/api'

import NavBar from '~components/navbar'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      loaded: false
    }
  }

  async componentWillMount () {
    const userCursor = tree.select('user')

    userCursor.on('update', ({data}) => {
      console.log('Cursor data =>', data)
      const user = data.currentData
      this.setState({user})
    })

    if (tree.get('jwt')) {
      const me = await api.get('/user/me')

      tree.set('user', me.user)
      tree.set('loggedIn', me.loggedIn)
      tree.commit()
    }

    this.setState({loaded: true})
  }

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return <div>
      <NavBar />
      {this.props.children}
    </div>
  }
}

export default root(tree, Layout)
