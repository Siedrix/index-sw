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


class PostCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading : false
    }
  }

  componentWillMount () {}

  async submitHandler ({formData}) {
    if(this.state.loading) { return }

    formData.tags = formData.tags.split(',')
    this.setState({loading: true})
    var data
    try {
      data = await api.post('/post', formData)
    } catch (e) {
      this.setState({error: e.message, loading: false})
    }

    this.setState({
      redirectToPost: data.uuid,
      loading : false
    })
  }

  render () {
    if (this.state.redirectToPost) {
      return <Redirect to={`/u/` + tree.get("user").screenName} />
    }

    var loadingElem
    if(this.state.loading){
      loadingElem = (<span><button className='button is-primary is-fullwidth is-loading' type='submit'>Please be patiente</button><div className="notification is-warning">
       We are building <strong>INDDEX</strong> at this very moment. Creating a new post will take 20-30 seconds. Thank you for your patience.
      </div></span>)
    } else {
      loadingElem = <button className='button is-primary is-fullwidth' type='submit'>Submit</button>
    }

    return (
      <div className='App container' style={{marginTop: 40, marginBottom: 100}}>
        <div className='card-content'>
          <div className='content'>
            <BaseForm schema={schema}
              uiSchema={uiSchema}
              onSubmit={(e) => { this.submitHandler(e) }}
              onError={(e) => { this.errorHandler(e) }}>
              <div>
                {loadingElem}
              </div>
            </BaseForm>
          </div>
        </div>
      </div>
    )
  }
}

export default PostCreate
