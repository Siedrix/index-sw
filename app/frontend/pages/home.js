import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '~core/api'
import Post from '~components/post'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      loadingMore: false,
      page: 0
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
      posts: data,
      page: 0
    })
  }

  async loadMoreHandler () {
    this.setState({loadingMore: true})

    const morePosts = await api.get('/post', {start: (this.state.page + 1) * 20})

    this.setState({
      loaded: true,
      posts: {
        data: this.state.posts.data.concat(morePosts.data),
        total: morePosts.total
      },
      page: this.state.page + 1
    })

    this.setState({loadingMore: false})
  }

  render () {
    const {posts, loaded, err} = this.state

    var postsEls
    var loadMoreButton
    if (loaded) {
      postsEls = posts.data.map((p, i) => {
        return <Post key={i} data={p} />
      })

      if (this.state.posts.total <= this.state.posts.data.length) {
        loadMoreButton = <div />
      } else if (!this.state.loadingMore) {
        loadMoreButton = <button className='button is-primary is-fullwidth' onClick={() => this.loadMoreHandler()}>More</button>
      } else {
        loadMoreButton = <button className='button is-primary is-fullwidth is-loading' type='submit'>Please be patiente</button>
      }
    } else {
      postsEls = <div>Loading...</div>
    }

    return (
      <div>
        <section className='home hero is-info bsa has-text-centered'>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns is-vcentered'>
                <div className='column'>
                  <p className='title'>Inddex</p>
                  <p className='subtitle'>
                    Share content, and what you learned from it!
                  </p>
                </div>
              </div>
              <div className='columns is-vcentered'>
                <div className='column is-8 is-offset-2'>
                  <p className='subtitle'>
                    “Quería aprender acerca de la bolsa de valores, me han recomendado muchos libros, entre ellos uno de más de 1500 páginas súper especializado, el mejor contenido del tema pero muy complejo para empezar.<br />
                    <b>Después de 5 horas de investigación encontré 3 contenidos mejores para mi nivel de conocimiento.” --Santigo Zavala</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <nav className="columns">
                <span className="column has-text-centered">
                  <span className="icon is-large">
                    <i className="fa fa-university"></i>
                  </span>
                  <p className="title is-4"><strong>Discover</strong></p>
                  <p className="subtitle">Find content for your <strong>learning path</strong></p>
                </span>
                <span className="column has-text-centered">
                  <span className="icon is-large">
                    <i className="fa fa-cubes"></i>
                  </span>
                  <p className="title is-4"><strong>Collaborative Learning</strong></p>
                  <p className="subtitle">Write and share <strong>insights</strong> from content</p>
                </span>
                <span className="column has-text-centered">
                  <span className="icon is-large">
                    <i className="fa fa-users"></i>
                  </span>
                  <p className="title is-4"><strong>Recommend</strong></p>
                  <p className="subtitle">Suggest content to <strong>friends</strong></p>
                </span>
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

        <div className='container' style={{marginTop: 40, marginBottom: 100}}>
          {postsEls}
          {loadMoreButton}
        </div>

      </div>
    )
  }
}

export default Home
