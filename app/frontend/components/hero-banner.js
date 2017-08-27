import React, { Component } from 'react'

class HeroBanner extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return <section className='home hero is-info bsa has-text-centered'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column'>
              <p className='title'>{this.props.title}</p>
              <p className='subtitle'>{this.props.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  }
}

export default HeroBanner
