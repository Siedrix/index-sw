import React, { Component } from 'react'
import api from '~core/api'

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
      console.log('=>', e)
    }

    this.setState({
      loaded: true,
      user: user,
      posts: data
    })
  }

  render () {
    const {user, posts, loaded} = this.state
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
        <h1>{user.displayName}</h1>
        <h2>@{user.screenName}</h2>

        {postsEls}
      </div>
    )
  }
}

export default UserPosts