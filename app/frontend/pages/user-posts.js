import React, { Component } from 'react'

class PostSingle extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="columns">
        <div className="column is-one-quarter">is-one-quarter</div>
        <div className="column">Auto</div>
      </div>
    )
  }
}

export default PostSingle
