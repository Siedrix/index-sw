import React, { Component } from 'react'
import api from '~core/api'
import tree from '~core/tree'
import { Redirect } from 'react-router-dom'

import {BaseForm, TextareaWidget, TextWidget} from '~components/base-form'

const schema = {
  type: 'object',
  required: ['url', 'description', 'tags'],
  properties: {
    url: {type: 'string', title: 'Url'},
    description: {type: 'string', title: 'Description'},
    tags: {type: 'string', title: 'Tags'}
  }
}

const uiSchema = {
  url: { 'ui:widget': TextWidget },
  description: { 'ui:widget': TextareaWidget },
  tags: { 'ui:widget': TextWidget }
}

const baseData = {
  url: 'http://www.nytimes.com/2012/07/15/fashion/the-challenge-of-making-friends-as-an-adult.html',
  description: 'lolz 222',
  tags: 'foo,bar'
}

class PostCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {}

  async submitHandler ({formData}) {
    formData.tags = formData.tags.split(',')
    var data
    try {
      data = await api.post('/post', formData)
    } catch (e) {
      this.setState({error: e.message})
    }

    this.setState({
      redirectToPost: data.uuid
    })
  }

  render () {
    if (this.state.redirectToPost) {
      return <Redirect to={`/app/p/${this.state.redirectToPost}`} />
    }

    return (
      <div className='App container' style={{marginTop: 40, marginBottom: 100}}>
        <div className='card-content'>
          <div className='content'>
            <BaseForm schema={schema}
              uiSchema={uiSchema}
              formData={baseData}
              onSubmit={(e) => { this.submitHandler(e) }}
              onError={(e) => { this.errorHandler(e) }}>
              <div>
                <button className='button is-primary is-fullwidth' type='submit'>Submit</button>
              </div>
            </BaseForm>
          </div>
        </div>
      </div>
    )
  }
}

export default PostCreate
