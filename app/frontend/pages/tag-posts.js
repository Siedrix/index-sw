import React, { Component } from 'react'
import api from '~core/api'
import Post from '~components/post'
import HeroBanner from '~components/hero-banner'

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
      return <Post data={p}/>
    })

    return (
      <div>
        <HeroBanner title={tag} />
        <div className='container' style={{marginTop: 40, marginBottom: 100}}>
          {postsEls}
        </div>
      </div>
    )
  }
}

export default UserTagPosts
