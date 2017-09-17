import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './styles.scss'

class Menu extends React.Component {
  constructor (props) {
    super(props)

    this.logout = this.logout.bind(this)
  }
  logout () {
    this.props.dispatch({
      type: 'logout'
    })
  }
  render () {
    const classes = ['menu']
    if (this.props.hidden) {
      classes.push('hidden')
    }
    return (
      <ul className={classes.join(' ')}>
        {this.props.loggedIn
          ? (
            <li>
              <button onClick={this.logout}>Logout</button>
            </li>
          )
          : null
        }
        <li>
          <span>Version: {this.props.appVersion}</span>
        </li>
      </ul>
    )
  }
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  appVersion: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired
}

module.exports = exports = connect()(Menu)
