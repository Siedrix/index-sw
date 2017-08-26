import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import tree from '~core/tree'

import Layout from './layout'

import Home from './pages/home'
import About from './pages/about'
import SignUp from './pages/sign-up'
import LogIn from './pages/log-in'

import App from './pages/app'
import PostSingle from './pages/post-single'
import UserPosts from './pages/user-posts'
import TagPosts from './pages/tag-posts'
import UserTagPosts from './pages/user-tag-posts'

const LoginRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    if (tree.get('loggedIn')) {
      return <Redirect to={{
        pathname: '/app'
      }} />
    } else {
      return <Component {...props} />
    }
  }} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => {
    if (!tree.get('loggedIn')) {
      return <Redirect to={{
        pathname: '/log-in'
      }} />
    } else {
      return <Component {...props} />
    }
  }} />
}

const AppRouter = () => {
  return (<Router>
    <Layout>
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <LoginRoute exact path='/sign-up' component={SignUp} />
        <LoginRoute exact path='/log-in' component={LogIn} />
        <PrivateRoute exact path='/app' component={App} />
        <Route exact path='/app/p/:uuid' component={PostSingle} />
        <Route exact path='/u/:username/:tagname' component={UserTagPosts} />
        <Route exact path='/u/:username' component={UserPosts} />
        <Route exact path='/t/:tagname' component={TagPosts} />
      </div>
    </Layout>
  </Router>)
}

export default AppRouter
