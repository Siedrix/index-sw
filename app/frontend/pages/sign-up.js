import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import api from '~core/api'
import tree from '~core/tree'
import { Redirect } from 'react-router-dom'

import {BaseForm, PasswordWidget, EmailWidget, TextWidget} from '~components/base-form'

const schema = {
  type: 'object',
  required: ['email', 'password', 'screenName', 'displayName'],
  properties: {
    email: {type: 'string', title: 'Email'},
    password: {type: 'string', title: 'Password'},
    screenName: {type: 'string', title: 'ScreenName'},
    displayName: {type: 'string', title: 'DisplayName'}
  }
}

const uiSchema = {
  password: { 'ui:widget': PasswordWidget },
  email: { 'ui:widget': EmailWidget },
  screenName: { 'ui:widget': TextWidget },
  displayName: { 'ui:widget': TextWidget }
}

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
  }

  errorHandler (e) {}

  async submitHandler ({formData}) {
    const data = await api.post('/user', formData)

    window.localStorage.setItem('jwt', data.jwt)
    tree.set('jwt', data.jwt)
    tree.set('user', data.user)
    tree.set('loggedIn', true)
    tree.commit()

    this.setState({
      formData: {},
      redirect: true
    })
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={'/u/' + tree.get("user").screenName} />
    }

    return (
      <div className='SignUp single-form'>
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>
              SignUp
            </p>
            <a className='card-header-icon'>
              <span className='icon'>
                <i className='fa fa-angle-down' />
              </span>
            </a>
          </header>
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
      </div>
    )
  }
}

export default SignUp
