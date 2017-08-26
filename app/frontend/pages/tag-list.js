import React, { Component } from 'react'

import api from '~core/api'
import Post from '~components/post'

class TagList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.getPosts()
  }

  errorHandler (e) {
    console.log(e)
  }

  async getPosts () {
    var data
    try {
      data = await api.get('/tag')
    } catch (e) {
      this.setState({error: e.message})
    }

    this.setState({
      tags: data,
      loaded: true
    })
  }

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }
    const tagsEls = this.state.tags.data.map(t => {
        return <a href={"/t/" + t.slug}>
          <h4>{t.name}</h4>
        </a>
    })

    return (
    <div>
      <div>
        <h1 className='title'>Tags</h1>
      </div>
      <br />
      {tagsEls}
    </div>)
  }
}

export default TagList
