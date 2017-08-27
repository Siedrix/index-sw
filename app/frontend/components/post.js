import React, { Component } from 'react'
import api from '~core/api'
import { Link } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky';
import moment from 'moment'
moment.locale('en');

let i = 0;
class Header extends Component {
  render() {
    return (
      <div style={{ ...this.props.style, overflow: 'auto'}}>
        <p>
          <a className="button is-light">Close</a>
        </p>
      </div>
    );
  }
}

class Post extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isToggleOn: !this.props.open,
      like: !this.props.open
    }
  }

  handleClick () {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  async createPostLike () {

    var data
    try {
      data = await api.post('/', {'post': this.props.data})
    } catch (e) {
      this.setState({error: e.message})
    }
    debugger
    this.setState({
      likeMade: data.uuid
    })
  }

  likeClick () {
    const postLike = this.createPostLike()
    if(postLike)
    this.setState(prevState => ({
      like: !prevState.like
    }))
  }

  render () {
    const postsTags = this.props.data.tags.map(t => {
      return <Link className="level-item" to={"/t/" + t.slug}>
        <small className="button is-light" >{t.name}</small>
      </Link>
    })

    return <div className='box'>
          <article className='media'>
            <div className='media-left'>
              <figure className='image is-64x64'>
                { this.props.data.siteIcon && <img src={this.props.data.siteIcon} alt='Image' />}
              </figure>
              <StickyContainer style={{ height: '500px', margin:'0px'}} className={this.state.isToggleOn ? '' : 'hero is-success is-fullheight'} >
                <Sticky>
                  {
                    ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
                      console.log({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight });
                      return <div style={{ ...style, overflow: 'auto'}} >
                                <p>
                                  <a onClick={() => this.handleClick()} className={this.state.isToggleOn ? 'button is-light hide-sticky' : 'button is-light show-sticky'}>Close</a>
                                </p>
                              </div>
                    }
                  }
                </Sticky>
              </StickyContainer>
            </div>
            <div className='media-content'>
              <div className='content'>
                <p>
                  <strong>{this.props.data.siteName}</strong> <small>{this.props.data.title}</small>
                  <br /><small></small>
                  <nav className="level is-mobile">
                    <div className="level-left">
                        {moment(this.props.data.createdAt).format('LLLL')}
                    </div>
                    <div className="level-right">
                      {postsTags}
                    </div>
                  </nav>
                  <div className="card">
                    <div className="card-content">
                      <p className="subtitle">
                        <Link className='highlight' to={"/u/" + this.props.data.user.screenName}>{"@" + this.props.data.user.screenName}</Link> learned in this site:
                      </p>
                      <p className="title" style={{marginTop: 20, marginBottom: 20}}>
                        “{this.props.data.description}”
                      </p>

                    </div>
                  </div>
                  <br/>
                  <div className={this.state.isToggleOn ? 'collapse-content' : 'show-content'} dangerouslySetInnerHTML={{__html: this.props.data.html}} />
                </p>
              </div>
              <div>
                <a className="button" onClick={() => this.handleClick()} className={this.state.isToggleOn ? 'show-sticky' : 'hide-sticky'}>{this.state.isToggleOn ? 'More...' : 'Less...'}</a>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">

                </div>
                <div className="level-right">
                  <a className="level-item">
                    <span className="icon is-medium tooltip" data-tooltip="Share your learning"><i className="fa fa-reply"></i></span>
                  </a>
                  <a onClick={() => this.likeClick()} className={this.state.like ? 'tooltip' : 'level-item islike tooltip'}  data-tooltip="Like this">
                    <span className="icon is-medium badge" data-badge="8"><i className="fa fa-heart"></i></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-medium tooltip" data-tooltip="Report Content"><i className="fa fa-ellipsis-h"></i></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
  }
}

export default Post
