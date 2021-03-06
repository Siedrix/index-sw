import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    const tagsEls = this.state.tags.map(t => {
      return <Link to={'/t/' + t.slug} className='tags has-addons' style={{display: 'inline', padding: 10}}>
        <span className='tag'>
          {t.name}
          <span className='badge'>{t.count}</span>
        </span>
      </Link>
    })

    return (
      <div className='container' style={{marginTop: 40, marginBottom: 100}}>
        <h1 className='title'>Tags</h1>
        <br />
        {tagsEls}
      </div>)
  }
}

export default TagList
