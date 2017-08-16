import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import api from '../api'

import '../styles/credentials.css'

class Credentials extends React.Component {
  constructor (props) {
    super(props)

    this.userChanged = this.userChanged.bind(this)
    this.passChanged = this.passChanged.bind(this)
    this.testCredentials = this.testCredentials.bind(this)

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
    return api.testCredentials(this.props.dispatch, creds)
  }

  render () {
    return (
      <ul className="credentials">
        <li><input type="text" placeholder="username" onChange={this.userChanged} defaultValue={this.props.user} /></li>
        <li><input type="password" placeholder="password" onChange={this.passChanged} defaultValue={this.props.pass} /></li>
        <li><button onClick={this.testCredentials}>Login</button></li>
      </ul>
    )
  }
}

Credentials.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired
}

module.exports = exports = connect()(Credentials)