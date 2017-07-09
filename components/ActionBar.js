import React from 'react'
import PropTypes from 'prop-types'

import '../styles/action-bar.scss'

const onEnter = (fn) => {
  return (event) => {
    return event.keyCode === 13
      ? fn()
      : null
  }
}

const undoAll = () => {
  console.log('undoAll coming soon')
}

const undoAllButton = () => {
  return (
    <li>
      <button onClick={undoAll} onKeyPress={onEnter(undoAll)}>Undo</button>
    </li>
  )
}

const diffSummary = ({ add, edit, remove}) => {
  const more = add.length
  const diff = edit.length
  const less = remove.length
  return (
    <li className="diffSummary">
      <ul>
        {more > 0 ? (<li>Adding {more} new records</li>) : null}
        {diff > 0 ? (<li>Modifying {diff} records</li>) : null}
        {less > 0 ? (<li>Deleting {less} records</li>) : null}
      </ul>
    </li>
  )
}

const reviewChanges = () => {
  console.log('reviewChanges coming soon')
}

const reviewChangesButton = (changes) => {
  return (
    <li>
      <button onClick={reviewChanges} onKeyPress={onEnter(reviewChanges)}>Review Changes</button>
    </li>
  )
}

const save = () => {
  console.log('save coming soon')
}

const saveButton = () => {
  return (
    <li>
      <button onClick={save} onKeyPress={onEnter(reviewChanges)}>Save</button>
    </li>
  )
}

class ActionBar extends React.Component {
  render () {
    const dirty = this.props.add.length > 0
      || this.props.edit.length > 0
      || this.props.remove.length > 0
    const classes = [
      'action-bar'
    ]
    if (dirty) {
      classes.push('dirty')
    }
    return (
      <ul className={classes.join(' ')}>
        {undoAllButton()}
        {diffSummary({
          add: this.props.add,
          edit: this.props.edit,
          remove: this.props.remove
        })}
        {reviewChangesButton()}
        {saveButton()}
      </ul>
    )
  }
}

ActionBar.propTypes = {
  add: PropTypes.array,
  edit: PropTypes.array,
  remove: PropTypes.array
}

module.exports = exports = ActionBar