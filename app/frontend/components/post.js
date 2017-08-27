import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import tree from '~core/tree'

moment.locale('en')

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
      return <Link className='' to={'/t/' + t.slug}>
        <small className='button is-light' style={{margin: 5}}>{t.name}</small>
      </Link>
    })

    var editLink
    if (tree.get('user').uuid === this.props.data.user.uuid) {
      editLink = <Link to={'/app/p/' + this.props.data.uuid}><i className='fa fa-pencil' /></Link>
    }

    return <div className='box'>
      <article className='media'>
        <div className='media-content'>
          <div className='content'>
            <p>
              {this.props.data.siteIcon && (<figure className='image is-64x64' style={{float: 'left', margin: 10}}>
                <img src={this.props.data.siteIcon} alt='Image' />
              </figure>)}
              <p style={{marginBottom: 0}}><strong>{this.props.data.title}</strong></p>
              <p style={{marginBottom: 0}}><small>{this.props.data.siteName}</small></p>
              <nav className='level is-mobile'>
                <div className='level-left'>
                  {moment(this.props.data.createdAt).format('LLLL')}
                </div>
              </nav>
              <div className='level-right'>
                {postsTags}
              </div>
            </p>
          </div>
          <div>
            <p className='subtitle'>
              <Link className='highlight' to={'/u/' + this.props.data.user.screenName}>{'@' + this.props.data.user.screenName}</Link> learned in this site:
            </p>
            <p className='title' style={{marginTop: 20, marginBottom: 20}}>
              “{this.props.data.description}”
            </p>
          </div>
          <div className='card'>
            <div className='card-content'>
              <div className={this.state.isToggleOn ? 'collapse-content' : 'show-content'} dangerouslySetInnerHTML={{__html: this.props.data.html}} />
            </div>
          </div>
          <nav className='level is-mobile' style={{marginTop: 10}}>
            <div className='level-left'>
              <a className='button' onClick={() => this.handleClick()}>{this.state.isToggleOn ? 'Read...' : 'Hide...'}</a>
            </div>
            <div className='level-right'>
              <a className='level-item'>
                <span className='icon is-medium'><i className='fa fa-reply' /></span>
              </a>
              <a className='level-item'>
                <span className='icon is-medium'><i className='fa fa-heart' /></span>
              </a>
              <a className='level-item'>
                <span className='icon is-medium'><i className='fa fa-ellipsis-h' /></span>
              </a>
              {editLink}
            </div>
          </nav>
        </div>
      </article>
    </div>
  }
}

export default Post
