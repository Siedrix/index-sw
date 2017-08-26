import React, { Component } from 'react'
import api from '~core/api'
import Post from '~components/post'

class UserPosts extends Component {
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

    var data
    var user
    try {
      user = await api.get(`/user/${username}`)
      data = await api.get('/post/', {user: username})
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
    if (!loaded) {
      return (<div>Loading...</div>)
    }

    if (err) {
      return (<div>{err.message}</div>)
    }

    const postsEls = posts.data.map(post => {
      return <Post data={post} />
    })

    return (
      <div>
        <h1>{user.displayName}</h1>
        <h2>@{user.screenName}</h2>

        {postsEls}
      </div>
    )
  }
}

export default UserPosts
