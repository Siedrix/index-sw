import React, { Component } from 'react'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <section className='home hero is-info bsa'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column is-4'>
              <p className='title'>Home</p>
              <p className='subtitle'>Welcome to marble seeds!</p>
            </div>

            <div className='column is-8'>
              <div className='bsa-cpc' />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
