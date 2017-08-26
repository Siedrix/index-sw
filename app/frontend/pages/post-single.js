import React, { Component } from 'react'

import api from '~core/api'

class PostSingle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      isToggleOn: true

    }

    this.handleClick = this.handleClick.bind(this);
    
  }

  componentWillMount (){
    this.getPosts()
  }

  errorHandler (e) {}

  async getPosts () {
    const uuid = this.props.match.params.uuid
    console.log('=>', uuid)
    //debugger

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

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    //debugger
  }


  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    return (<div>
      <div>
        <h1 className="title">Juanito Escarcha</h1>
      </div>
      <br/>
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={this.state.post.siteIcon} alt="Image"/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.state.post.siteName}</strong> <small>{this.state.post.title}</small> <br/><small>{this.state.post.createdAt}</small>
                <br />
                <div className={this.state.isToggleOn ? 'collapse-content' : 'show-content'} dangerouslySetInnerHTML={{__html: this.state.post.html}} ></div>
              </p>
            </div>
            <div>
              <a className="button is-white" onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'Leer más...' : 'Leer menos...'}</a>
            </div>
              
          </div>
        </article>
      </div>
    </div>)
  }
}

export default PostSingle
