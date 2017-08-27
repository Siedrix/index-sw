import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from '~core/api'
import Post from '~components/post'
import {BaseForm, TextareaWidget, TextWidget} from '~components/base-form'

const schema = {
  type: 'object',
  required: ['description', 'tags'],
  properties: {
    description: {type: 'string', title: 'Description'},
    tags: {type: 'string', title: 'Tags'}
  }
}

const uiSchema = {
  description: { 'ui:widget': TextareaWidget },
  tags: { 'ui:widget': TextWidget }
}

class PostSingle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount () {
    this.getPosts()
  }

  errorHandler (e) {}

  async getPosts () {
    const uuid = this.props.match.params.uuid

    var data
    try {
      data = await api.get('/post/' + uuid)
    } catch (e) {
      this.setState({error: e.message})
    }
    //debugger
    this.setState({
      post: data,
      loaded: true
    })
  }

  async submitHandler ({formData}) {
    const uuid = this.state.post.uuid
    formData.tags = formData.tags.split(',')

    await api.put('/post/' + uuid, formData)
    this.setState({
      redirectToUser: true
    })

  }

  async deleteHandler () {
    const uuid = this.state.post.uuid

    await api.del('/post/' + uuid)

    this.setState({
      redirectToHome: true
    })
  }

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    if (this.state.redirectToHome) {
      return <Redirect to='/' />
    }

    if (this.state.redirectToUser) {
      return <Redirect to={`/u/` + tree.get("user").screenName} />
    }

    const baseData = {
      description: this.state.post.description,
      tags: this.state.post.tags.map(t => t.name).join(',')
    }

    return (<div>
      <br />
      <div className='container' style={{marginTop: 40, marginBottom: 100}}>
        <div className='columns'>
          <div className='column is-two-thirds'>
            <Post data={this.state.post} open />
          </div>
          <div className='column is-one-third'>
            <div className='box'>
              <BaseForm schema={schema}
                uiSchema={uiSchema}
                formData={baseData}
                onSubmit={(e) => { this.submitHandler(e) }}
                onError={(e) => { this.errorHandler(e) }}>
                <div>
                  <button className='button is-primary is-fullwidth' type='submit'>Editar</button>
                </div>
              </BaseForm>
            </div>
            <div className='box'>
              <button className='button is-danger is-fullwidth' style={{color: 'white'}} onClick={() => this.deleteHandler()}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}

export default PostSingle
