import React, { Component } from 'react'
import api from '~core/api'

class UserTagPosts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.load()
  }

  async load () {
    const tag = this.props.match.params.tagname

    var data
    try {
      data = await api.get('/post/', {tag: tag})
    } catch (e) {
      return this.setState({err: e})
    }

    this.setState({
      loaded: true,
      posts: data
    })
  }

  render () {
    const {posts, loaded} = this.state
    const tag = this.props.match.params.tagname

    if (!loaded) {
      return (<div>Loading...</div>)
    }

    const postsEls = posts.data.map(p => {
      return <div className='card'>
        <h4>{p.title}</h4>
        <p>{p.description}</p>
      </div>
    })

    return (
      <div>
        <h1>{tag}</h1>

        {postsEls}
      </div>
    )
  }
}

export default UserTagPosts
