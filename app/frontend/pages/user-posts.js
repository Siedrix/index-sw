import React, { Component } from 'react'
import { branch } from 'baobab-react/higher-order'
import { Link } from 'react-router-dom'

import api from '~core/api'
import Post from '~components/post'
import HeroBanner from '~components/hero-banner'


const UserProfile = (props) => {
  const postsEls = props.data.posts.data.map(post => {
    return <Post data={post} />
  })

  const tagsEls = props.data.user.tags.map(tag => {
    return <small><Link to={'/u/' + props.data.user.screenName + '/' + tag.slug} className='button is-light'>{tag.name}</Link></small>
  })

  return (
    <div>
      <HeroBanner title={props.data.user.displayName} subtitle={'@' + props.data.user.screenName} />
      <div className='columns' style={{margin: 40}}>
        <div className='column is-one-quarter'>
          <div className='box'>
            <header className='card-header'>
              <p className='card-header-title'>
                Tags
              </p>
            </header>
            <div className='card-content'>
              {tagsEls}
            </div>
          </div>
        </div>
        <div className='column'>
          {postsEls}
        </div>
      </div>
    </div>
  )
}

const EmptyUserProfile = (props) => {
  return (
    <div className="has-text-centered">
      <HeroBanner title={props.data.user.displayName} subtitle={'@' + props.data.user.screenName} />
      <div className='notification is-success'>
       {props.data.user.displayName} Has nos created any post yet.
     </div>
    </div>
  )
}

const EmptyOwnProfile = (props) => {
  return (
    <div className='notification is-success has-text-centered'>
     You haven´t submitted any post yet, start by doing the first one here:
     <p className='control has-text-centered'>
       <Link className='bd-tw-button button is-primary' to='/post/create'>Submit Link</Link>
     </p>
   </div>
  )
}


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


    console.log(user)
    console.log(tree.get("user"))

    if(posts.total > 0){
      return <UserProfile data={{user:user, posts:posts}}/>
    } else if(this.props.loggedIn && user.uuid === tree.get("user").uuid) {
      return <EmptyOwnProfile data={{user:user}}/>
    } else {
      return <EmptyUserProfile data={{user:user}}/>
    }
  }
}

export default branch({
  loggedIn: 'loggedIn'
}, UserPosts)
