import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '~core/api'
import Post from '~components/post'

class Home extends Component {
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
    var data

    try {
      data = await api.get('/post')
    } catch (e) {
      return this.setState({err: e})
    }


    this.setState({
      loaded: true,
      posts: data
    })
  }


  render () {
    const {posts, loaded, err} = this.state

    const postsEls = (loaded)?
       posts.data.map(p => {
        return <Post data={p} />
      })
    :<div>Loading...</div>;

    return (
      <div>
        <section className='home hero is-info bsa has-text-centered'>
          <div className="hero-body">
            <div className='container'>
              <div className='columns is-vcentered'>
                <div className='column'>
                  <p className='title'>Inddex</p>
                  <p className='subtitle'>
                    Share content, and what you learned from it!
                  </p>


                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <nav className="columns">
                <a className="column has-text-centered" href="http://bulma.io/documentation/overview/responsiveness/">
                  <span className="icon is-large">
                    <i className="fa fa-university"></i>
                  </span>
                  <p className="title is-4"><strong>Discover</strong></p>
                  <p className="subtitle">Find content for your <strong>learning path</strong></p>
                </a>
                <a className="column has-text-centered" href="http://bulma.io/documentation/overview/modular/">
                  <span className="icon is-large">
                    <i className="fa fa-cubes"></i>
                  </span>
                  <p className="title is-4"><strong>Collaborative Learning</strong></p>
                  <p className="subtitle">Write and share <strong>insights</strong> from content</p>
                </a>
                <a className="column has-text-centered" href="http://bulma.io/documentation/columns/basics/">
                  <span className="icon is-large">
                    <i className="fa fa-users"></i>
                  </span>
                  <p className="title is-4"><strong>Recommend</strong></p>
                  <p className="subtitle">Suggest content to <strong>friends</strong></p>
                </a>
                <a className="column has-text-centered" href="https://github.com/Siedrix/index-sw">
                  <span className="icon is-large">
                    <i className="fa fa-github"></i>
                  </span>
                  <p className="title is-4"><strong>Free</strong></p>
                  <p className="subtitle">Open source on <strong>GitHub</strong></p>
                </a>
              </nav>
            </div>
          </div>
        </section>
        <section className='home hero is-info bsa has-text-centered'>
          <div className="hero-body">
            <div className='container'>
              <div className='columns is-vcentered'>
                <div className='column'>
                  <p className='title'>Some of the latest post:</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {postsEls}

      </div>
    )
  }
}

export default Home
