import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import onEnter from '../helpers/onEnter.js'

import '../styles/action-bar.css'

class ActionBar extends React.Component {
  constructor (props) {
    super(props)

    this.undoAll = this.undoAll.bind(this)
    this.reviewChanges = this.reviewChanges.bind(this)
    this.save = this.save.bind(this)
  }
  undoAll () {
    return this.props.dispatch({
      type: 'undoAll'
    })
  }

  undoAllButton () {
    return (
      <li>
        <button onClick={this.undoAll} onKeyPress={onEnter(this.undoAll)}>Undo</button>
      </li>
    )
  }

  diffSummary () {
    const more = this.props.add.length
    const diff = this.props.edit.length
    const less = this.props.remove.length
    const nbNewFields = this.props.newFields.length
    return (
      <li className="diffSummary">
        <ul>
          {nbNewFields > 0 ? (<li>Creating {nbNewFields} new fields</li>) : null}
          {more > 0 ? (<li>Adding {more} new records</li>) : null}
          {diff > 0 ? (<li>Modifying {diff} records</li>) : null}
          {less > 0 ? (<li>Deleting {less} records</li>) : null}
        </ul>
      </li>
    )
  }

  reviewChanges () {
    this.props.dispatch({
      type: 'reviewChanges',
      nbNewFields: this.props.nbNewFields,
      newFields: this.props.newFields,
      add: this.props.add,
      edit: this.props.edit,
      remove: this.props.remove
    })
  }

  reviewChangesButton () {
    return (
      <li>
        <button onClick={this.reviewChanges} onKeyPress={onEnter(this.reviewChanges)}>Review Changes</button>
      </li>
    )
  }

  save () {
    return this.dispatch({
      add: this.props.add,
      edit: this.props.edit,
      remove: this.props.remove
    })
  }

  saveButton () {
    return (
      <li>
        <button onClick={this.save} onKeyPress={onEnter(this.save)}>Save</button>
      </li>
    )
  }
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
        {this.undoAllButton()}
        {this.diffSummary()}
        {this.reviewChangesButton()}
        {this.saveButton()}
      </ul>
    )
  }
}

ActionBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newFields: PropTypes.array.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.array.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired
}

module.exports = exports = connect()(ActionBar)