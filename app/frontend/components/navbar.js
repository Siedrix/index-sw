import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { branch } from 'baobab-react/higher-order'

import tree from '~core/tree'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobileMenu: 'close',
      redirect: false
    }
  }

  handleLogout () {
    this.setState({redirect: true})

    window.localStorage.removeItem('jwt')
    tree.set('jwt', null)
    tree.set('user', null)
    tree.set('loggedIn', false)
    tree.commit()
  }

  handleNavbarBurgerClick () {
    if (this.state.mobileMenu === 'open') {
      this.setState({mobileMenu: 'close'})
    } else {
      this.setState({mobileMenu: 'open'})
    }
  }

  render () {
    if (this.state.redirect) {
      this.setState({redirect: false})
      return <Redirect to='/log-in' />
    }

    var navbarMenuClassName = 'navbar-menu'
    if (this.state.mobileMenu === 'open') {
      navbarMenuClassName = 'navbar-menu is-active'
    }

    var navButtons
    if (this.props.loggedIn) {
      navButtons = (<div className='field is-grouped'>
        <p className='control'>
          <Link className='bd-tw-button button is-primary' to='/post/create'>Submit Link</Link>
        </p>
        <p className='control'>
          <button className='bd-tw-button button' onClick={() => this.handleLogout()}>Log out</button>
        </p>
      </div>)
    } else {
      navButtons = (<div className='field is-grouped'>
        <p className='control'>
          <Link className='bd-tw-button button' to='/log-in'>Log in</Link>
        </p>
        <p className='control'>
          <Link className='bd-tw-button button is-primary' to='/sign-up'>Sign up</Link>
        </p>
      </div>)
    }

    return (
      <nav className='navbar'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <img src="/public/logo.png"/>
          </Link>

          <div className='navbar-burger burger' onClick={(e) => this.handleNavbarBurgerClick(e)}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={navbarMenuClassName}>
          <div className='navbar-start'>
            <Link className='navbar-item' to='/about'>
              About
            </Link>
          </div>
          <div className='navbar-end'>
            <div className='navbar-item'>
              {navButtons}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default branch({
  loggedIn: 'loggedIn'
}, NavBar)
