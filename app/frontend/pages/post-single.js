import React, { Component } from 'react'

import api from '~core/api'

class PostSingle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount (){
    this.getPosts()
  }

  errorHandler (e) {}

  async getPosts () {
    const uuid = this.props.match.params.uuid
    console.log('=>', uuid)
    debugger

    var data
    try {
      data = await api.get('/post/' + uuid)
    } catch (e) {
      this.setState({error: e.message})
    }

    this.setState({
      post: data,
      loaded: true
    })
  }

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image"/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                <br />
                {this.state.post.description}
              </p>
            </div>
            <nav className="level is-mobile">
              <div className="level-left">
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-reply"></i></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-retweet"></i></span>
                </a>
                <a className="level-item">
                  <span className="icon is-small"><i className="fa fa-heart"></i></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    )
  }
}

export default PostSingle
