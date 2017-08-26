import React, { Component } from 'react'

import api from '~core/api'
import Post from '~components/post'

class PostSingle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.getPosts()
  }

  errorHandler (e) {}

  async getPosts () {
    const uuid = this.props.match.params.uuid

    var data
    try {
      data = await api.get('/post/' + uuid)
    } catch (e) {
      this.setState({error: e.message})
    }

    this.setState({
      post: data,
      loaded: true
    })
  }

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return (<div>
      <div>
        <h1 className='title'>Juanito Escarcha</h1>
      </div>
      <br />
      <Post data={this.state.post} />
    </div>)
  }
}

export default PostSingle
