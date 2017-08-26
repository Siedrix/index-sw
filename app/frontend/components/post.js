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
    const postsTags = this.props.data.tags.map(t => {
      return <a className="level-item">
                    <small><a className="button is-light" href={"/t/" + t.name}>{t.name}</a></small> 
                  </a>
    })

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
                  <strong>{this.props.data.siteName}</strong> <small>{this.props.data.title}</small> 
                  <br /><small></small>
                  <nav className="level is-mobile">
                    <div className="level-left">
                        {this.props.data.createdAt}
                    </div>
                    <div className="level-right">
                      {postsTags}
                    </div>
                  </nav>
                  <div className="card">
                    <div className="card-content">
                      <p className="subtitle">
                        <a  href={"/u/" + this.props.data.user.displayName}>{"@" + this.props.data.user.displayName}</a> learned in this site:
                      </p>
                      <p className="title">
                        “{this.props.data.description}”
                      </p>

                    </div>
                  </div>
                  <br/>
                  <div className={this.state.isToggleOn ? 'collapse-content' : 'show-content'} dangerouslySetInnerHTML={{__html: this.props.data.html}} />
                </p>
              </div>
              <div>
                <a className="button" onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'More...' : 'Less...'}</a>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">
                    
                </div>
                <div className="level-right">
                  <a className="level-item">
                    <span className="icon is-medium"><i className="fa fa-reply"></i></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-medium"><i className="fa fa-heart"></i></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-medium"><i className="fa fa-ellipsis-h"></i></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
  }
}

export default Post
