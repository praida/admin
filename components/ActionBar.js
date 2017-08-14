import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import api from '../api'

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
        <button onClick={this.undoAll}>Revert</button>
      </li>
    )
  }

  diffSummary () {
    const more = this.props.add.length
    const diff = Object.keys(this.props.edit).length
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
        <button onClick={this.reviewChanges}>Review Changes</button>
      </li>
    )
  }

  save () {
    const add = this.props.add.filter(item => !item.isDeleted)
    api.saveChanges(this.props.dispatch, {
      add: add,
      edit: this.props.edit,
      remove: this.props.remove,
      newFields: this.props.newFields,
      editedFields: this.props.editedFields,
      deletedFields: this.props.deletedFields,
    })
      .then(() => {
        return Promise.all([
          api.getFields(this.props.dispatch),
          api.getRecords(this.props.dispatch)
        ])
      })
  }

  saveButton () {
    return (
      <li>
        <button onClick={this.save}>Save</button>
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
  editedFields: PropTypes.object.isRequired,
  deletedFields: PropTypes.object.isRequired,
  add: PropTypes.array.isRequired,
  edit: PropTypes.object.isRequired,
  remove: PropTypes.array.isRequired,
  reviewing: PropTypes.bool.isRequired
}

module.exports = exports = connect()(ActionBar)