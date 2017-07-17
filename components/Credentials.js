import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import '../styles/credentials.css'

class Credentials extends React.Component {
  constructor (props) {
    super(props)

    this.userChanged = this.userChanged.bind(this)
    this.passChanged = this.passChanged.bind(this)
    this.testCredentials = this.testCredentials.bind(this)
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
    this.props.dispatch({
      type: 'testCredentials',
      user: this.props.user,
      pass: this.props.pass
    })
  }

  render () {
    return (
      <ul className="credentials">
        <li><input type="text" placeholder="username" onChange={this.userChanged} /></li>
        <li><input type="password" placeholder="password" onChange={this.passChanged} /></li>
        <li><button onClick={this.testCredentials}>Test credentials</button></li>
      </ul>
    )
  }
}

Credentials.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.app.user,
    pass: state.app.pass
  }
}

module.exports = exports = connect(mapStateToProps)(Credentials)