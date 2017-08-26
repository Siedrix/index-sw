import React, { Component } from 'react'

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isToggleOn: !this.props.open
    }
  }

  handleClick () {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render () {
    return <div className='box'>
      <article className='media'>
        <div className='media-left'>
          <figure className='image is-64x64'>
            { this.props.data.siteIcon && <img src={this.props.data.siteIcon} alt='Image' />}
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p>
              <strong>{this.props.data.siteName}</strong> <small>{this.props.data.title}</small> <br /><small>{this.props.data.createdAt}</small>
              <br />
              <div className={this.state.isToggleOn ? 'collapse-content' : 'show-content'} dangerouslySetInnerHTML={{__html: this.props.data.html}} />
            </p>
          </div>
          <div>
            <a className='button is-white' onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'Leer más...' : 'Leer menos...'}</a>
          </div>
        </div>
      </article>
    </div>
  }
}

export default Post
