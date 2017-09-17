import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from '../../api/'

import Message from '../Message/'

import './styles.scss'

class Auth extends React.Component {
  constructor (props) {
    super(props)

    this.onKeyPress = this.onKeyPress.bind(this)
    this.userChanged = this.userChanged.bind(this)
    this.passChanged = this.passChanged.bind(this)
    this.testCredentials = this.testCredentials.bind(this)
    this.dismissLoginError = this.dismissLoginError.bind(this)

    if (this.props.user && this.props.pass) {
      this.testCredentials()
    }
  }

  userChanged (event) {
    this.props.dispatch({
      type: 'userChanged',
      user: event.target.value
    })
  }

  passChanged (event) {
    this.props.dispatch({
      type: 'passChanged',
      pass: event.target.value
    })
  }

  testCredentials () {
    const creds = {
      user: this.props.user,
      pass: this.props.pass
    }
    api.testCredentials(this.props.dispatch, creds)
    return false
  }

  onKeyPress (event) {
    if (event.charCode === 13) {
      this.testCredentials()
    }
    return false
  }

  dismissLoginError () {
    this.props.dispatch({
      type: 'dismissLoginError'
    })
  }

  render () {
    let loginErr
    switch (this.props.loginError) {
      case 401:
        loginErr = 'Wrong username or password'
        break
      case 5:
        loginErr = 'Oops, something went wrong. Please try again later.'
        break
      case 0:
      default:
        loginErr = null
        break
    }
    let error = null
    if (loginErr && !this.props.loggingIn) {
      error = (
        <Message className="loginError" level="error" onDismiss={this.dismissLoginError}>
          <p>{loginErr}</p>
        </Message>
      )
    }
    const classes = ['auth']
    if (this.props.loggedIn) {
      classes.push('loggedIn')
    }
    return (
      <form className={classes.join(' ')}>
        <header>Sign in to PRAIDA</header>

        <fieldset>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={this.userChanged} defaultValue={this.props.user} onKeyPress={this.onKeyPress} />

          <label htmlFor="password">Password</label>
          <input type="password" onChange={this.passChanged} defaultValue={this.props.pass} onKeyPress={this.onKeyPress} />

          <button className="primaryBtn" onClick={this.testCredentials}>Login</button>
          {error}
        </fieldset>
      </form>
    )
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loginErr: PropTypes.number,
  loggedIn: PropTypes.bool.isRequired,
}

module.exports = exports = connect()(Auth)