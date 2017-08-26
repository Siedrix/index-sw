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

    //debugger
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

        <div className="columns">
          <div className="column is-one-quarter">
            <div className="card">
              <header class="card-header">
                <p class="card-header-title">
                  Tags
                </p>
              </header>
              <div className="card-content">
                <small><a className="button is-light" href="">foo</a></small> 
                <br/>
                <small><a className="button is-light" href="">bar</a></small> 
                <br/>
                <small><a className="button is-light" href="">ia</a></small> 
                <br/>

              </div>
            </div>
          </div>
          <div className="column">
            {postsEls}
          </div>
        </div>
      </div>
    )
  }
}

export default UserPosts
