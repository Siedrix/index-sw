import React, { Component } from 'react'
import request from '~core/request'
import tree from '~core/tree'
import { Redirect } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      loading: true
    }
  }

  componentWillMount () {
    this.load()
  }

  async load () {
    const body = await request('get', null, 'https://www.reddit.com/r/all.json')

    this.setState({
      loading: false,
      posts: body.data.children.map(item => item.data)
    })
  }

  render () {
    const {loading, posts} = this.state

    if (loading) {
      return <div>Loading...</div>
    }

    if (this.state.redirect) {
      return <Redirect to='/log-in' />
    }

    const postsList = posts.map(post => {
      return <div key={post.id}>
        <h4>{post.title}</h4>
        <a href={'http://reddit.com' + post.permalink} target='_blank'>{post.domain}</a>
      </div>
    })

    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Post list</h2>
        </div>
        {postsList}
      </div>
    )
  }
}

export default App
