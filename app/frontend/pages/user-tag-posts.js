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
    const username = this.props.match.params.username
    const tagName = this.props.match.params.tagname

    var data
    var user
    try {
      user = await api.get(`/user/${username}`)
      data = await api.get('/post/', {user: username, tag: tagName})
    } catch (e) {
      return this.setState({err: e})
    }

    this.setState({
      loaded: true,
      user: user,
      posts: data
    })
  }

  render () {
    const {user, posts, loaded, err} = this.state
    const tagName = this.props.match.params.tagname

    if (!loaded) {
      return (<div>Loading...</div>)
    }

    if (err) {
      return (<div>{err.message}</div>)
    }

    const postsEls = posts.data.map(p => {
      return <div className='card'>
        <h4>{p.title}</h4>
        <p>{p.description}</p>
      </div>
    })

    return (
      <div>
        <h1>{user.displayName} - {tagName}</h1>
        <h2>@{user.screenName}</h2>

        {postsEls}
      </div>
    )
  }
}

export default UserTagPosts
