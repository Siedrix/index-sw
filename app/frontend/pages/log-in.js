import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import tree from '~core/tree'
import api from '~core/api'

import {BaseForm, PasswordWidget, EmailWidget} from '~components/base-form'

const schema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {type: 'string', title: 'Email'},
    password: {type: 'string', title: 'Password'}
  }
}

const uiSchema = {
  password: {'ui:widget': PasswordWidget},
  email: {'ui:widget': EmailWidget}
}

class LogIn extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  errorHandler (e) {}

  async submitHandler ({formData}) {
    console.log('=>', formData)

    var data
    try {
      data = await api.post('/user/login', formData)
    } catch (e) {
      this.setState({error: e.message})
    }

    window.localStorage.setItem('jwt', data.jwt)
    tree.set('jwt', data.jwt)
    tree.set('user', data.user)
    tree.set('loggedIn', true)
    tree.commit()
    this.setState({redirect: true})
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/app' />
    }

    return (
      <div className='LogIn single-form'>
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>
              Log in
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
                  <button className='button is-primary is-fullwidth' type='submit'>Log in</button>
                </div>
              </BaseForm>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn
