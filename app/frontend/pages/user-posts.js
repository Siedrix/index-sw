import React, { Component } from 'react'
import api from '~core/api'
import Post from '~components/post'
import { Link, Redirect } from 'react-router-dom'

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

    var postsEls
    if(posts.total > 0){
      postsEls= posts.data.map(post => {
       return <Post data={post} />
     })
    } else {
     postsEls =
        <div className="notification is-success">
          You have no submitted any post yet, start by doing the first one here:
          <p className='control'>
            <Link className='bd-tw-button button is-primary' to='/post/create'>Submit Link</Link>
          </p>
        </div>
    }

    const tagsEls = user.tags.map(tag => {
      return <small><Link to={'/u/' + user.screenName + "/" + tag.slug} className="button is-light">{tag.name}</Link></small>
    })


    return (
      <div>
        <strong>{user.displayName}</strong> <small>@{user.screenName} posts:</small>
        <div className="columns">
          <div className="column is-one-quarter">
            <div className="card">
              <header class="card-header">
                <p class="card-header-title">
                  Tags
                </p>
              </header>
              <div className="card-content">
                {tagsEls}

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
