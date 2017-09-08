import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Message = (props) => {
  const classes = props.className.split(' ')
  classes.push('message')
  if (props.level) {
    classes.push(`message-level-${props.level}`)
  }
  return (
    <div className={classes.join(' ')}>
      <button className="dismiss" onClick={props.onDismiss}>x</button>
      {props.children}
    </div>
  )
}

Message.propTypes = PropTypes.func.isRequired,

module.exports = exports = Message