import React, { Component } from 'react'
import request from '~core/request'
import tree from '~core/tree'
import { Redirect } from 'react-router-dom'

import {BaseForm, TextareaWidget, TextWidget} from '~components/base-form'

const schema = {
  type: 'object',
  required: ['email', 'password', 'screenName', 'displayName'],
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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {}

  submitHandler () {
    debugger
  }

  render () {
    return (
      <div className='App'>
        <div className='card-content'>
          <div className='content'>
            <BaseForm schema={schema}
              uiSchema={uiSchema}
              onSubmit={(e) => { this.submitHandler(e) }}
              onError={(e) => { this.errorHandler(e) }}>
              <div>
                <button className='button is-primary is-fullwidth' type='submit'>Sign up</button>
              </div>
            </BaseForm>
          </div>
        </div>
      </div>
    )
  }
}

export default App
